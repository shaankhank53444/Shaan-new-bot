const A = require('axios');
const B = require('fs-extra');
const P = require('path');
const S = require('yt-search');

module.exports.config = {
    name: "audio",
    version: "6.0.0",
    permission: 0,
    prefix: true,
    premium: false,
    category: "media",
    credits: "Shaan Khan",
    description: "Fast YouTube Music Downloader",
    commandCategory: "media",
    usages: ".audio [song name]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID: t, messageID: m } = event;
    const q = args.join(" ");
    const nix = "https://raw.githubusercontent.com/aryannix/stuffs/master/raw/apis.json";
    const p = P.join(__dirname, "cache", `${Date.now()}_audio.mp3`);

    if (!q) return api.sendMessage("❌ Please provide a song name!", t, m);

    const waiting = await api.sendMessage("✅ Apki Request Jari Hai Please wait..", t);

    try {
        const D = await A.get(nix);
        const E = D.data.api;

        let u = q;
        if (!q.startsWith("http")) {
            const r = await S(q);
            const v = r.videos[0];
            if (!v) throw new Error("Error ytdl issue 🧘");
            u = v.url;
        }

        const F = await A.get(`${E}/ytdl`, {
            params: { url: u, type: "audio" }
        });

        if (!F.data.status || !F.data.downloadUrl) throw new Error("API Error");

        const DL = F.data.downloadUrl;
        const title = F.data.title || "Song";

        const writer = B.createWriteStream(p);
        const res = await A({
            method: "GET",
            url: DL,
            responseType: "stream"
        });

        res.data.pipe(writer);

        writer.on("finish", async () => {
            api.setMessageReaction("✅", m, () => {}, true);

            // 1. PEHLE TITLE WALA MESSAGE (Sing file ki tarah)
            await api.sendMessage(`🎵 Title: ${title}\n\n✨ »»𝑶𝑾𝑵𝑬𝑹««★™ »»𝑺𝑯𝑨𝑨𝑵 𝑲𝑯𝑨𝑵««\n          🥀𝒀𝑬 𝑳𝑶 𝑩𝑨𝑩𝒀 𝑨𝑷𝑲𝑰👉AUDIO`, t);

            // 2. PHIR SONG FILE SEND HOGI
            await api.sendMessage({
                body: `🎧 ${title}`,
                attachment: B.createReadStream(p)
            }, t, (err) => {
                if (waiting) api.unsendMessage(waiting.messageID);
                if (B.existsSync(p)) B.unlinkSync(p);
            });
        });

    } catch (e) {
        if (waiting) api.unsendMessage(waiting.messageID);
        return api.sendMessage(`❌ Error: ${e.message}`, t, m);
    }
};