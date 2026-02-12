module.exports = {
  config: {
    name: "linkAutoDownload",
    version: "1.4.0",
    hasPermssion: 0,
    credits: "Shaan Babu",
    description: "Automatically detects links and downloads with platform title.",
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
    const { alldown } = require("arif-babu-downloader");

    const body = (event.body || "").trim();
    if (!body.startsWith("https://")) return;

    // Platform detection logic
    let platform = "Video";
    if (body.includes("facebook.com") || body.includes("fb.watch")) platform = "Facebook";
    else if (body.includes("instagram.com")) platform = "Instagram";
    else if (body.includes("tiktok.com")) platform = "TikTok";
    else if (body.includes("youtube.com") || body.includes("youtu.be")) platform = "YouTube";

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const data = await alldown(body);

      if (!data || !data.data || !data.data.high) {
        return api.sendMessage("❌ Valid download link not found.", event.threadID);
      }

      const videoURL = data.data.high;
      const filePath = __dirname + `/cache/auto_${event.senderID}.mp4`;

      const response = await axios.get(videoURL, { responseType: "arraybuffer" });
      fs.writeFileSync(filePath, Buffer.from(response.data, "utf-8"));

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return api.sendMessage(
        {
          body: `✨❁ ━━ ━[ 𝐎𝐖𝐍𝐄𝐑 ]━ ━━ ❁✨\n\nᴛɪᴛʟᴇ: ${platform}\n\n✨❁ ━━ ━[ 𝑺𝑯𝑨𝑨𝑵 ]━ ━━ ❁✨`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath), // Delete file after sending
        event.messageID
      );
    } catch (err) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      // console.error(err);
    }
  },
};
