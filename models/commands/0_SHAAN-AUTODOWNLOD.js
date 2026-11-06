const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");
const crypto = require("crypto");

const downloader = require("uzair-shan");

const MAX_SIZE = 45 * 1024 * 1024;

module.exports.config = {
    name: "autodl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Uzair Rajput",
    description: "Automatically download supported social media links",
    commandCategory: "Media",
    usages: "Automatically detects video/audio links",
    cooldowns: 5
};

// Supported platform detection
function detectPlatform(url) {
    const host = new URL(url).hostname.toLowerCase();

    const platforms = [
        {
            match: /tiktok\.com$/,
            fn: "tiktok"
        },
        {
            match: /instagram\.com$/,
            fn: "igdl"
        },
        {
            match: /facebook\.com$|fb\.watch$/,
            fn: "fbdown"
        },
        {
            match: /twitter\.com$|x\.com$/,
            fn: "twitter"
        },
        {
            match: /youtube\.com$|youtu\.be$/,
            fn: "youtube"
        },
        {
            match: /spotify\.com$/,
            fn: "spotify"
        },
        {
            match: /soundcloud\.com$/,
            fn: "soundcloud"
        },
        {
            match: /threads\.net$/,
            fn: "threads"
        },
        {
            match: /capcut\.com$/,
            fn: "capcut"
        },
        {
            match: /mediafire\.com$/,
            fn: "mediafire"
        },
        {
            match: /drive\.google\.com$/,
            fn: "gdrive"
        },
        {
            match: /pinterest\.[a-z.]+$|pin\.it$/,
            fn: "pinterest"
        },
        {
            match: /xiaohongshu\.com$|xhslink\.com$/,
            fn: "rednote"
        },
        {
            match: /douyin\.com$/,
            fn: "douyin"
        },
        {
            match: /kuaishou\.com$|gifshow\.com$/,
            fn: "kuaishou"
        },
        {
            match: /snackvideo\.com$/,
            fn: "snackvideo"
        },
        {
            match: /cocofun\.com$/,
            fn: "cocofun"
        }
    ];

    return platforms.find(p => p.match.test(host))?.fn || null;
}

// Extract downloadable links from package response
function extractLinks(data) {
    const results = [];

    const priority = [
        "hdplay",
        "no_watermark",
        "normal_video",
        "video",
        "play",
        "wmplay",
        "downloadmp3",
        "audio",
        "mp3",
        "videourl",
        "rawurl",
        "url",
        "links",
        "downloads",
        "formats",
        "result"
    ];

    function walk(value, key = "") {
        if (!value) return;

        const normalized = key.toLowerCase();

        if (
            typeof value === "string" &&
            /^https?:\/\//i.test(value) &&
            !/(thumbnail|cover|avatar|image)/i.test(normalized)
        ) {
            results.push({
                url: value,
                score: priority.findIndex(k => normalized.includes(k))
            });
            return;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                walk(item, key);
            }
            return;
        }

        if (typeof value === "object") {
            for (const [k, v] of Object.entries(value)) {
                walk(v, k);
            }
        }
    }

    walk(data);

    const unique = new Map();

    for (const item of results) {
        if (!unique.has(item.url)) {
            unique.set(item.url, item);
        }
    }

    return [...unique.values()]
        .sort((a, b) => {
            const x = a.score < 0 ? 999 : a.score;
            const y = b.score < 0 ? 999 : b.score;
            return x - y;
        })
        .map(item => item.url);
}

// Download media into temporary file
async function downloadFile(url) {
    const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), "uzair-autodl-")
    );

    const filePath = path.join(
        tempDir,
        crypto.randomUUID() + ".mp4"
    );

    try {
        const response = await axios.get(url, {
            responseType: "stream",
            timeout: 120000,
            maxRedirects: 5,
            maxContentLength: MAX_SIZE,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const contentType = (
            response.headers["content-type"] || ""
        ).toLowerCase();

        const contentLength = Number(
            response.headers["content-length"] || 0
        );

        if (
            contentLength &&
            contentLength > MAX_SIZE
        ) {
            throw new Error("Media exceeds 45 MB limit");
        }

        if (
            contentType.includes("text/html") ||
            contentType.includes("application/json")
        ) {
            throw new Error("Download URL did not return media");
        }

        let received = 0;

        const writer = fs.createWriteStream(filePath);

        response.data.on("data", chunk => {
            received += chunk.length;

            if (received > MAX_SIZE) {
                response.data.destroy(
                    new Error("Media exceeds 45 MB limit")
                );
            }
        });

        await new Promise((resolve, reject) => {
            response.data.pipe(writer);

            writer.on("finish", resolve);
            writer.on("error", reject);
            response.data.on("error", reject);
        });

        if (!fs.existsSync(filePath) || received === 0) {
            throw new Error("Downloaded file is empty");
        }

        const extension = contentType.includes("audio/")
            ? "mp3"
            : "mp4";

        const finalPath = path.join(
            tempDir,
            `Uzair-Rajput.${extension}`
        );

        fs.renameSync(filePath, finalPath);

        return {
            tempDir,
            filePath: finalPath,
            extension
        };

    } catch (error) {
        fs.rmSync(tempDir, {
            recursive: true,
            force: true
        });

        throw error;
    }
}

// Send media to Messenger group
async function sendMedia(api, threadID, file, platform) {
    return new Promise((resolve, reject) => {
        api.sendMessage(
            {
                body:
                    `╭───「 UZAIR AUTO DOWNLOADER 」\n` +
                    `│ Platform: ${platform}\n` +
                    `│ Developer: Uzair Rajput\n` +
                    `╰──────────────────`,
                attachment: fs.createReadStream(file.filePath)
            },
            threadID,
            error => {
                if (error) reject(error);
                else resolve();
            }
        );
    });
}

// Automatic link handler
module.exports.handleEvent = async function ({
    api,
    event
}) {
    if (
        !event.body ||
        event.senderID === api.getCurrentUserID()
    ) return;

    const urls = event.body.match(
        /https?:\/\/[^\s<>"']+/gi
    );

    if (!urls || !urls.length) return;

    const processed = new Set();

    for (let url of urls.slice(0, 3)) {
        url = url.replace(/[),.!?]+$/, "");

        if (processed.has(url)) continue;
        processed.add(url);

        let platform;

        try {
            platform = detectPlatform(url);
        } catch {
            continue;
        }

        if (!platform) continue;

        let tempFile;

        try {
            const downloaderFunction = downloader[platform];

            if (typeof downloaderFunction !== "function") {
                continue;
            }

            const result = await downloaderFunction(url);

            if (
                !result ||
                result.status === false
            ) {
                throw new Error(
                    result?.message || "Media not found"
                );
            }

            let links = extractLinks(result);

            // Generic AIO fallback
            if (!links.length && typeof downloader.aio === "function") {
                const fallback = await downloader.aio(url);

                if (fallback && fallback.status !== false) {
                    links = extractLinks(fallback);
                }
            }

            if (!links.length) {
                throw new Error("No downloadable media link found");
            }

            tempFile = await downloadFile(links[0]);

            await sendMedia(
                api,
                event.threadID,
                tempFile,
                platform
            );

        } catch (error) {
            console.error(
                "[UZAIR AUTODL]",
                platform,
                error.message
            );

            api.sendMessage(
                `❌ ${platform} download failed.\n${error.message}`,
                event.threadID,
                event.messageID
            );

        } finally {
            if (tempFile?.tempDir) {
                fs.rmSync(tempFile.tempDir, {
                    recursive: true,
                    force: true
                });
            }
        }
    }
};

// Manual command
module.exports.run = async function ({
    api,
    event
}) {
    api.sendMessage(
        "🤖 Uzair Auto Downloader is active.\nSend a supported social-media link.",
        event.threadID,
        event.messageID
    );
};