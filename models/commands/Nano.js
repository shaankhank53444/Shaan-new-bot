const axios = require("axios"); // Fixed: 'Const' to 'const'
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

// Aapki nayi API key yahan laga di gayi hai
const OPENAI_API_KEY = "Sk-or-v1-d4f2b35f6c24b7b3e594e478075d13383e2895d1c18d3b3986bcdcd90ce04029";

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

    // OpenAI Image Edit API Setup
    const form = new FormData();
    form.append("image", fs.createReadStream(imgPath));
    
    // API instructions clear honi chahiye
    form.append("prompt", `Edit this image in a realistic way. Instruction: ${prompt}`);
    
    // Valid OpenAI model name for image editing
    form.append("model", "dall-e-2"); 
    form.append("size", "1024x1024");
    form.append("response_format", "b64_json"); // API ko batana ke base64 output chahiye

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
