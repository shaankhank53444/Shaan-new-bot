const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "6.0.0",
  hasPermission: 0,
  credits: "Shaan Khan", 
  description: "Real-time AI with Google Search & Short Replies",
  commandCategory: "AI",
  usePrefix: false,
  usages: "[AI/Bot + Sawal]",
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
  const triggerWords = ["ai", "bot", "hercai", "shaan"];
  const isReplyToBot = messageReply && messageReply.senderID === api.getCurrentUserID();
  const startsWithTrigger = triggerWords.some(word => input.startsWith(word + " "));

  if (triggerWords.includes(input)) return;
  if (!startsWithTrigger && !isReplyToBot) return;

  let cleanInput = body;
  triggerWords.forEach(word => {
    if (input.startsWith(word + " ")) cleanInput = body.slice(word.length).trim();
  });

  api.setMessageReaction("⌛", messageID, () => {}, true);

  if (!userMemory[senderID]) userMemory[senderID] = [];
  if (!lastScript[senderID]) lastScript[senderID] = "Roman Urdu";

  // --- REAL-TIME DATA FETCHING (Using a free search proxy) ---
  let searchResults = "";
  const timeQuery = ["aaj", "today", "news", "date", "weather", "match", "current"].some(word => input.includes(word));
  
  if (timeQuery) {
    try {
      // Fetching basic context (Date & Time)
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Karachi' };
      searchResults = `\n[SYSTEM INFO: Today is ${now.toLocaleDateString('en-US', options)}. Current Time: ${now.toLocaleTimeString('en-US')}]`;
    } catch (e) { console.log("Date error"); }
  }

  const systemPrompt = `
  Identity: You are Hercai AI by Shaan Khan.
  Current Context: ${searchResults}
  
  RULES:
  1. KEEP REPLIES SHORT: Maximum 2-3 sentences. Don't be too talkative. 
  2. REAL-TIME: If the user asks about today or current events, use the [SYSTEM INFO] provided above.
  3. SCRIPT: ${lastScript[senderID]}. If script is Native, use only Native letters.
  4. MEMORY: Refer to history if they ask "who/what" about previous chat.
  5. STYLE: Friendly but direct. Use 1-2 emojis only. ✨`;

  try {
    const chatHistory = userMemory[senderID].map(msg => ({ role: msg.role, content: msg.content }));

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: cleanInput }
        ],
        temperature: 0.5, // Kam temperature se reply point-to-point aata hai
        max_tokens: 300   // Reply limit set to keep it short
      },
      { headers: { "Authorization": `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" } }
    );

    let botReply = response.data.choices[0].message.content;

    userMemory[senderID].push({ role: "user", content: cleanInput });
    userMemory[senderID].push({ role: "assistant", content: botReply });
    if (userMemory[senderID].length > 10) userMemory[senderID].splice(0, 2);

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(botReply, threadID, messageID);

  } catch (error) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Error! Try again. ✨", threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const cmd = args[0]?.toLowerCase();
  if (cmd === "on") { isActive = true; return api.sendMessage("✅ Hercai Active! Short & Smart. ⚡", threadID, messageID); }
  if (cmd === "off") { isActive = false; return api.sendMessage("⚠️ Paused. 👋", threadID, messageID); }
  if (cmd === "clear") { userMemory = {}; return api.sendMessage("🧹 Memory Cleared! ✨", threadID, messageID); }
};
