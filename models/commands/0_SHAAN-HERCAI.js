const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "5.0.0",
  hasPermission: 0,
  credits: "Shaan Khan", 
  description: "Ultra-Advanced AI (Llama 3.3 70B) with Real-time awareness",
  commandCategory: "AI",
  usePrefix: false,
  usages: "[AI/Bot + Sawal] ya [Reply to bot]",
  cooldowns: 1,
};

let userMemory = {};
let lastScript = {}; 
let isActive = true;

const GROQ_API_KEY = "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"; 

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!isActive || !body) return;

  const input = body.trim().toLowerCase();
  const triggerWords = ["ai", "bot", "hercai", "shaan"]; // Shaan bhi trigger word hai
  const startsWithTrigger = triggerWords.some(word => input.startsWith(word + " "));
  const isReplyToBot = messageReply && messageReply.senderID === api.getCurrentUserID();

  // Agar sirf word likha ho (khali "bot"), to reply nahi karega
  if (triggerWords.includes(input)) return;
  if (!startsWithTrigger && !isReplyToBot) return;

  let cleanInput = body;
  triggerWords.forEach(word => {
    if (input.startsWith(word + " ")) {
      cleanInput = body.slice(word.length).trim();
    }
  });

  api.setMessageReaction("⚡", messageID, () => {}, true);

  if (!userMemory[senderID]) userMemory[senderID] = [];
  if (!lastScript[senderID]) lastScript[senderID] = "Roman Urdu";

  // Language Detection (Auto-Switch)
  if (input.includes("pashto") || input.includes("پښتو")) lastScript[senderID] = "NATIVE PASHTO (پښتو)";
  else if (input.includes("urdu") && (input.includes("script") || input.includes("mein"))) lastScript[senderID] = "NATIVE URDU (اردو)";
  else if (input.includes("hindi") || input.includes("हिंदी")) lastScript[senderID] = "NATIVE HINDI (हिंदी)";
  else if (input.includes("roman")) lastScript[senderID] = "Roman Urdu";

  // --- THE "GEMINI-STYLE" SYSTEM PROMPT ---
  const systemPrompt = `
  Identity: You are Hercai, a highly advanced AI developed by Shaan Khan.
  Knowledge Cutoff: December 2024.
  Capabilities: You act like Gemini/ChatGPT. You are an expert in coding, history, science, and current affairs.
  
  CONTEXTUAL RULES:
  1. CURRENT SCRIPT: ${lastScript[senderID]}.
  2. DEEP MEMORY: Always refer to the provided chat history to maintain a continuous flow. If a user asks "Who was I talking about?", look at the history.
  3. REAL-TIME STYLE: Even if you don't have a live internet hook, use your internal Llama 70B logic to answer complex "What's happening" questions based on your vast training.
  4. FORMATTING: Use Markdown (bold, lists) for readability.
  5. SCRIPT LOCK: If script is NATIVE, NEVER use English letters. Use ONLY native alphabets.
  6. PERSONALITY: Intelligent, helpful, and uses emojis ✨🔥.
  `;

  try {
    const chatHistory = userMemory[senderID].map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: cleanInput }
        ],
        temperature: 0.6, // Balanced for accuracy like ChatGPT
        max_tokens: 4096,  // Large responses allowed
        top_p: 0.9
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let botReply = response.data.choices[0].message.content;

    // Advance Memory (Stores last 15 messages for high context)
    userMemory[senderID].push({ role: "user", content: cleanInput });
    userMemory[senderID].push({ role: "assistant", content: botReply });
    if (userMemory[senderID].length > 15) userMemory[senderID].splice(0, 2);

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(botReply, threadID, messageID);

  } catch (error) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(error);
    return api.sendMessage("❌ AI is currently overloaded. Please try again! 🥀", threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const cmd = args[0]?.toLowerCase();

  if (cmd === "on") { isActive = true; return api.sendMessage("✅ Hercai Intelligence Activated! ✨", threadID, messageID); }
  if (cmd === "off") { isActive = false; return api.sendMessage("⚠️ Powering down... 👋", threadID, messageID); }
  if (cmd === "clear") { userMemory = {}; lastScript = {}; return api.sendMessage("🧹 Memory Reset! I am now a fresh AI. 🧠", threadID, messageID); }
};
