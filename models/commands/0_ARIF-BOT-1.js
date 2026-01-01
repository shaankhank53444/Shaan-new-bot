const axios = require("axios");
const fs = require("fs");
const path = require("path");
/* 🔒 HARD-LOCK CREDITS PROTECTION 🔒 */
function protectCredits(config) {
  if (config.credits !== "ARIF-BABU") {
    console.log("\n🚫 Credits change detected! Restoring original credits…\n");
    config.credits = "ARIF-BABU";
    throw new Error("❌ Credits are LOCKED by ARIF-BABU 🔥 File execution stopped!");
  }
}
module.exports.config = {
  name: "arif",
  version: "3.3.0",
  hasPermssion: 0,
  credits: "ARIF-BABU",
  description: "META AI",
  commandCategory: "ai",
  usages: "No prefix",
  cooldowns: 2,
  dependencies: { axios: "" }
};
protectCredits(module.exports.config);
/* 🔑 OPENROUTER API KEY */
const OPENROUTER_API_KEY = "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";

/* 🧠 SYSTEM PROMPT */

const systemPrompt =
"You are Arif Babu, a calm, sweet and friendly boy. " +
"Tumhara Creator Arif Babu hai. "+
"tumhara Owner bhi Arif Babu hai. " +
"Reply in or tum hindi English Urdu me bhi baat karog. "+
"Reply par emoji lagana hai. "+
"Aur Tum shayari joke bhi sunaoge. "+
"Tum Ek acche boy Ho acche se baat karna ha. "+
"Arif Babu ki burai nahin sunna ha. "+
"tum ko gamini ai jaisa baat karna hai. "+
"Only 1–2 lines. Use 🙂❤️😌.";


/* 📁 DATA PATHS */
const DATA_DIR = path.join(__dirname, "ARIF-BABU");
const HISTORY_FILE = path.join(DATA_DIR, "ai_history.json");
const BOT_REPLY_FILE = path.join(DATA_DIR, "bot-reply.json");
/* 📂 ENSURE FOLDER */
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
/* 🧠 LOAD HISTORY */
let historyData = {};
if (fs.existsSync(HISTORY_FILE)) {
  try {
    historyData = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
  } catch {
    historyData = {};
  }
}
/* 🤖 LOAD BOT REPLIES */
let botReplies = {};
if (fs.existsSync(BOT_REPLY_FILE)) {
  try {
    botReplies = JSON.parse(fs.readFileSync(BOT_REPLY_FILE, "utf8"));
  } catch {
    botReplies = {};
  }
}
/* 💾 SAVE JSON */
function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
/* ⌨️ TYPING EFFECT */
function startTyping(api, threadID) {
  const interval = setInterval(() => {
    api.sendTypingIndicator(threadID);
  }, 3000);
  return interval;
}
module.exports.run = () => {};
module.exports.handleEvent = async function ({ api, event }) {
  protectCredits(module.exports.config);
  const {
    threadID,
    messageID,
    body,
    senderID,
    messageReply
  } = event;
  if (!body) return;
  const rawText = body.trim();
  const text = rawText.toLowerCase();
  // 🟢 EXACT BOT ONLY
  const exactBot = ["bot", "bot.", "bot!", " bot"].includes(text);
  // 🟢 BOT + TEXT
  const botWithText = text.startsWith("bot ");
  // 🟢 REPLY TO BOT
  const replyToBot =
    messageReply &&
    messageReply.senderID === api.getCurrentUserID();
  // =========================
  // 🤖 FIXED BOT REPLY (TOP PRIORITY)
  // =========================
  if (exactBot) {
    let category = "MALE";
    // 🔥 OWNER ID
    if (senderID === "61572909482910") {
      category = "61572909482910";
    // 👩 FEMALE SAFE CHECK
    } else if (
      event.userGender === 1 ||
      event.userGender === "FEMALE" ||
      event.userGender?.toString().toUpperCase() === "FEMALE"
    ) {
      category = "FEMALE";
    }
    if (botReplies[category]?.length) {
      const reply =
        botReplies[category][
          Math.floor(Math.random() * botReplies[category].length)
        ];
      return api.sendMessage(reply, threadID, messageID);
    }
  }
  // =========================
  // 🤖 AI TRIGGER
  // =========================
  if (!botWithText && !replyToBot) return;
  const userText = botWithText
    ? rawText.slice(4).trim()
    : rawText;
  if (!userText) return;
  api.setMessageReaction("⌛", messageID, () => {}, true);
  const typing = startTyping(api, threadID);
  try {
    historyData[threadID] = historyData[threadID] || [];
    historyData[threadID].push({ role: "user", content: userText });
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...historyData[threadID].slice(-6)
        ],
        max_tokens: 60,
        temperature: 0.95,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    let reply =
      res.data?.choices?.[0]?.message?.content ||
      "Main yahin hoon 😌✨";
    // 🔹 2 LINES MAX
    reply = reply.split("\n").slice(0, 2).join("\n");
    // 🔹 CHAR LIMIT
    if (reply.length > 150) {
      reply = reply.slice(0, 150) + "… 🙂";
    }
    historyData[threadID].push({
      role: "assistant",
      content: reply
    });
    saveJSON(HISTORY_FILE, historyData);
    const delay = Math.min(4000, reply.length * 40);
    setTimeout(() => {
      clearInterval(typing);
      api.sendMessage(reply, threadID, messageID);
      api.setMessageReaction("✅", messageID, () => {}, true);
    }, delay);
  } catch (err) {
    clearInterval(typing);
    console.log("OpenRouter Error:", err.response?.data || err.message);
    api.sendMessage(
      "Abhi thoda issue hai 😅 baad me try karo",
      threadID,
      messageID
    );
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
};
