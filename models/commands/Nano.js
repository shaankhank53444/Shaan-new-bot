const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "nano",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Shaan + ChatGPT",
  description: "Nano Style AI Image Editor (ChatGPT)",
  commandCategory: "ai",
  usages: "[reply image] [prompt]",
  cooldowns: 5
};

const OPENAI_API_KEY = "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";

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");

    if (!event.messageReply?.attachments?.[0]) {
      return api.sendMessage("❌ Kisi image ko reply karo.", event.threadID);
    }

    if (!prompt) {
      return api.sendMessage("❌ Prompt likho (example: make him a boy, change dress).", event.threadID);
    }

    const imgUrl = event.messageReply.attachments[0].url;

    api.sendMessage("🧠 Nano AI processing image...", event.threadID);

    // download image
    const imgPath = path.join(__dirname, "cache", `nano_${Date.now()}.png`);

    const img = await axios.get(imgUrl, { responseType: "stream" });

    await new Promise((res, rej) => {
      const w = fs.createWriteStream(imgPath);
      img.data.pipe(w);
      w.on("finish", res);
      w.on("error", rej);
    });

    // OpenAI Image Edit API
    const form = new FormData();
    form.append("image", fs.createReadStream(imgPath));
    form.append("prompt", `
      Edit this image in a realistic way.
      Instruction: ${prompt}
      Keep face identity same unless user requests transformation.
    `);
    form.append("model", "gpt-image-1");
    form.append("size", "1024x1024");

    const response = await axios.post(
      "https://api.openai.com/v1/images/edits",
      form,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...form.getHeaders()
        }
      }
    );

    const base64 = response.data.data[0].b64_json;
    const outPath = path.join(__dirname, "cache", `nano_out_${Date.now()}.png`);

    fs.writeFileSync(outPath, Buffer.from(base64, "base64"));

    api.sendMessage(
      {
        body: `✨ Nano Edit Done!\n📝 Prompt: ${prompt}`,
        attachment: fs.createReadStream(outPath)
      },
      event.threadID,
      () => {
        fs.unlinkSync(imgPath);
        fs.unlinkSync(outPath);
      }
    );

  } catch (err) {
    console.log(err);
    api.sendMessage(
      `❌ Error: ${err.response?.data?.error?.message || err.message}`,
      event.threadID
    );
  }
};