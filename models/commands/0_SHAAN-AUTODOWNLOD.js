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
    const downloader = require("uzair-shan");

    const body = (event.body || "").trim();
    if (!body.startsWith("https://")) return;

    let filePath;

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const host = new URL(body).hostname.toLowerCase();

      const platforms = [
        { match: /tiktok\.com$/, method: "tiktok" },
        { match: /instagram\.com$/, method: "igdl" },
        { match: /facebook\.com$|fb\.watch$/, method: "fbdown" },
        { match: /twitter\.com$|x\.com$/, method: "twitter" },
        { match: /youtube\.com$|youtu\.be$/, method: "youtube" },
        { match: /spotify\.com$/, method: "spotify" },
        { match: /soundcloud\.com$/, method: "soundcloud" },
        { match: /threads\.net$/, method: "threads" },
        { match: /capcut\.com$/, method: "capcut" },
        { match: /mediafire\.com$/, method: "mediafire" },
        { match: /drive\.google\.com$/, method: "gdrive" },
        { match: /pinterest\.com$|pin\.it$/, method: "pinterest" },
        { match: /xiaohongshu\.com$|xhslink\.com$/, method: "rednote" },
        { match: /douyin\.com$/, method: "douyin" },
        { match: /kuaishou\.com$/, method: "kuaishou" },
        { match: /snackvideo\.com$/, method: "snackvideo" },
        { match: /cocofun\.com$/, method: "cocofun" }
      ];

      const platform = platforms.find(p => p.match.test(host));
      if (!platform || typeof downloader[platform.method] !== "function") {
        throw new Error("Unsupported link");
      }

      const data = await downloader[platform.method](body);

      if (!data || data.status === false) {
        throw new Error("Download failed");
      }

      function findTitle(obj, depth = 0) {
        if (!obj || depth > 6) return null;

        if (typeof obj === "string") return null;

        if (Array.isArray(obj)) {
          for (const item of obj) {
            const found = findTitle(item, depth + 1);
            if (found) return found;
          }
          return null;
        }

        if (typeof obj === "object") {
          for (const key of ["title", "topic", "caption", "description"]) {
            if (typeof obj[key] === "string" && obj[key].trim()) {
              return obj[key].trim();
            }
          }

          for (const value of Object.values(obj)) {
            const found = findTitle(value, depth + 1);
            if (found) return found;
          }
        }

        return null;
      }

      function findMedia(obj, depth = 0) {
        if (!obj || depth > 8) return null;

        if (Array.isArray(obj)) {
          for (const item of obj) {
            const found = findMedia(item, depth + 1);
            if (found) return found;
          }
          return null;
        }

        if (typeof obj !== "object") return null;

        const priority = [
          "hd", "high", "normal_video", "video",
          "play", "no_watermark", "wmplay",
          "downloadmp3", "audio", "mp3",
          "videourl", "rawurl", "url",
          "links", "downloads", "formats", "result"
        ];

        for (const key of priority) {
          const value = obj[key];

          if (typeof value === "string" &&
              /^https?:\/\//i.test(value) &&
              !/thumbnail|cover|avatar|image/i.test(key)) {
            return value;
          }

          if (value && typeof value === "object") {
            const found = findMedia(value, depth + 1);
            if (found) return found;
          }
        }

        return null;
      }

      const videoTitle = findTitle(data) || "No Title Found";
      const videoURL = findMedia(data);

      if (!videoURL) throw new Error("Media URL not found");

      const response = await axios.get(videoURL, {
        responseType: "arraybuffer",
        timeout: 120000,
        maxContentLength: 45 * 1024 * 1024,
        maxBodyLength: 45 * 1024 * 1024
      });

      const contentType = response.headers["content-type"] || "";
      const isAudio =
        /audio|mpeg|mp3/i.test(contentType) ||
        ["spotify", "soundcloud"].includes(platform.method);

      const extension = isAudio ? "mp3" : "mp4";

      const cacheDir = __dirname + "/cache";
      await fs.ensureDir(cacheDir);

      filePath = `${cacheDir}/auto_${event.senderID}_${Date.now()}.${extension}`;

      await fs.writeFile(filePath, Buffer.from(response.data));

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return api.sendMessage(
        {
          body: `✨❁ ━━ ━[ 𝐎𝐖𝐍𝐄𝐑 ]━ ━━ ❁✨\n\nᴛɪᴛʟᴇ: ${videoTitle}\n\n✨❁ ━━ ━[ 𝑺𝑯𝑨𝑨𝑵 ]━ ━━ ❁✨`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => {
          if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        },
        event.messageID
      );

    } catch (err) {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      console.error("Auto Download Error:", err.message);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  },
};