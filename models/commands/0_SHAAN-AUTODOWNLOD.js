module.exports = {
  config: {
    name: "linkAutoDownload",
    version: "1.5.0",
    hasPermssion: 0,
    credits: "Shaan Babu",
    description: "Downloads video and shows its original title.",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },

  onLoad: function () {
    const fs = require("fs");
    const path = __filename;
    const fileData = fs.readFileSync(path, "utf8");

    if (!fileData.includes('credits: "Shaan Babu"')) {
      console.log("\n❌ ERROR: Credits Badle Gaye Hain! File Disabled ❌\n");
      process.exit(1);
    }
  },

  run: async function () {},

  handleEvent: async function ({ api, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const { alldown } = require("uzair-shan"); // Fixed package name spelling to match package.json

    const body = (event.body || "").trim();
    if (!body.startsWith("https://")) return;

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const data = await alldown(body);

      if (!data || !data.data || !data.data.high) {
        return api.sendMessage("❌ Valid download link not found.", event.threadID);
      }

      const videoTitle = data.data.title || data.title || "No Title Found";
      const videoURL = data.data.high;
      
      // Ensure cache directory exists
      const cacheDir = __dirname + `/cache`;
      fs.ensureDirSync(cacheDir);
      const filePath = cacheDir + `/auto_${event.senderID}.mp4`;

      const response = await axios.get(videoURL, { responseType: "arraybuffer" });
      
      // FIXED: Removed "utf-8" parameter so binary video data isn't corrupted
      fs.writeFileSync(filePath, Buffer.from(response.data));

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return api.sendMessage(
        {
          body: `✨❁ ━━ ━[ 𝐎𝐖𝐍𝐄𝐑 ]━ ━━ ❁✨\n\nᴛɪᴛʟᴇ: ${videoTitle}\n\n✨❁ ━━ ━[ 𝑺𝑯𝑨𝑨𝑵 ]━ ━━ ❁✨`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        },
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  },
};
