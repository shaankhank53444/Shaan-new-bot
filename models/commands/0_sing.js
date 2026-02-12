const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const yts = require("yt-search");

module.exports.config = {
  name: "sing",
  version: "1.9.0",
  hasPermssion: 0,
  credits: "SHAAN",
  description: "Music downloader (Prefix + No-Prefix) for E2EE",
  commandCategory: "music",
  usages: "sing [song name]",
  cooldowns: 5
};

async function handleMusic(api, event, query) {
  const { threadID, messageID } = event;
  if (!query) return api.sendMessage("❌ Please provide a song name!", threadID, messageID);

  const waiting = await api.sendMessage("✅ Apki Request Jari Hai Please wait...", threadID);

  try {
    // 1. YouTube Search
    const search = await yts(query);
    if (!search.videos || search.videos.length === 0) {
        if (waiting) api.unsendMessage(waiting.messageID);
        return api.sendMessage("❌ Song not found on YouTube.", threadID);
    }

    const video = search.videos[0];
    const videoUrl = video.url;

    // 2. API Fetching
    const nix = "https://raw.githubusercontent.com/aryannix/stuffs/master/raw/apis.json";
    const configRes = await axios.get(nix);
    let baseApi = configRes.data.api;
    if (baseApi.endsWith("/")) baseApi = baseApi.slice(0, -1);

    const apiUrl = `${baseApi}/play?url=${encodeURIComponent(videoUrl)}`;
    const res = await axios.get(apiUrl);
    const downloadUrl = res.data.downloadUrl || res.data.link || res.data.data?.downloadUrl;

    if (!downloadUrl) throw new Error("API failed.");

    // 3. File Path Setup
    const tempDir = path.join(__dirname, "cache");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    const filePath = path.join(tempDir, `${Date.now()}.mp3`);

    // 4. Download Stream
    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      method: "GET",
      url: downloadUrl,
      responseType: "stream",
    });

    downloadResponse.data.pipe(writer);

    writer.on("finish", () => {
      const formattedViews = new Intl.NumberFormat('en-US', { notation: "compact" }).format(video.views);

      // 5. Stylish Formatting (Top info, Bottom Signature)
      let infoMsg = `🎵 𝑻𝒊𝒕𝒍𝒆: ${video.title}\n\n` +
                    `⏱ 𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏: ${video.duration.timestamp}\n\n` +
                    `👤 𝑨𝒓𝒕𝒊𝒔𝒕: ${video.author.name}\n\n` +
                    `👀 𝑽𝒊𝒆𝒘𝒔: ${formattedViews}\n\n` +
                    `📅 𝑼𝒑𝒍𝒐𝒂𝒅𝒆𝒅: ${video.ago}\n\n` +
                    ` »»𝑶𝑾𝑵𝑬𝑹««★™  »»𝑺𝑯𝑨𝑨𝑵 𝑲𝑯𝑨𝑵««\n` +
                    `          🥀𝒀𝑬 𝑳𝑶 𝑩𝑨𝑩𝒀 𝑨𝑷𝑲𝑰👉 MUSIC\n\n` +
                    `────────────────────`;

      api.sendMessage(infoMsg, threadID);

      // 6. Final Audio Send (E2EE Compatible)
      api.sendMessage({
          body: `🎧 ${video.title}`,
          attachment: fs.createReadStream(filePath)
      }, threadID, (err) => {
          if (waiting) api.unsendMessage(waiting.messageID);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    });

    writer.on("error", () => {
        if (waiting) api.unsendMessage(waiting.messageID);
        api.sendMessage("❌ Download failed!", threadID);
    });

  } catch (err) {
    if (waiting) api.unsendMessage(waiting.messageID);
    return api.sendMessage("❌ API Error or Connection Issue.", threadID);
  }
}

// --- NO-PREFIX LOGIC ---
module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;
  const body = event.body.toLowerCase().trim();

  // Agar message "sing " se start ho raha hai (No Prefix)
  if (body.startsWith("sing ")) {
    const query = event.body.slice(5).trim();
    if (query) return handleMusic(api, event, query);
  }
};

// --- PREFIX LOGIC ---
module.exports.run = async function ({ api, event, args }) {
  // Jab prefix (/sing) use ho
  return handleMusic(api, event, args.join(" "));
};