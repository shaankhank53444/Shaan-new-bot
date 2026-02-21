1111const axios = require("axios");

module.exports.config = {
  name: "affu",
  version: "3.8.0",
  hasPermssion: 0,
  credits: "Shaan Khan",
  description: "Dewani AI - Pakistani Naughty GF Style",
  commandCategory: "ai",
  usages: "reply to message",
  cooldowns: 1
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;

  if (!body) return;

  // Initial call
  if (body.trim().toLowerCase() === "dewani") {
    return api.sendMessage("HAn ji Shaan Babu? Dewani haazir hai.. ✨😘", threadID, messageID);
  }

  const isReplyToBot = messageReply && messageReply.senderID == api.getCurrentUserID();

  if (isReplyToBot) {
    api.setMessageReaction("⌛", messageID, (err) => {}, true);

    global.affu = global.affu || {};
    const chatHistory = global.affu.chatHistory = global.affu.chatHistory || {};

    chatHistory[senderID] = chatHistory[senderID] || [];
    chatHistory[senderID].push(`User: ${body}`);
    if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();

    const historyText = chatHistory[senderID].join("\n");

    // Optimized Prompt: Short and Strict
    const systemPrompt = `Role: Pakistani Naughty GF (Dewani). Owner: Shaan Khan. 
Rules: 
1. Use Hinglish/Roman Urdu. 
2. Tone: Flirty, caring, 1-2 lines only. 
3. If user says "AI bolo", reply exactly: "Main Shaan Khan AI hoon 🙂❤️😌".
4. Use emojis.
Chat History:
${historyText}`;

    try {
      // Pollinations API using 'model=openai' for better instruction following
      const res = await axios.get(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}?model=openai`);
      let botReply = res.data.trim();

      // Clean up brackets or unwanted prefixes
      botReply = botReply.replace(/^(Dewani:|AI:)/i, "").trim();

      api.setMessageReaction("✅", messageID, (err) => {}, true);
      chatHistory[senderID].push(`Dewani: ${botReply}`);

      return api.sendMessage(botReply, threadID, messageID);
    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", messageID, (err) => {}, true);
    }
  }
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage("Dewani se baatein karne ke liye uske message par 'Reply' karein! ✨🇵🇰", event.threadID, event.messageID);
};