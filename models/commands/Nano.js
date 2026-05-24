const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "nano",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Shaan",
  description: "Nano Style AI Image Editor (Google Gemini)",
  commandCategory: "ai",
  usages: "[reply image] [prompt]",
  cooldowns: 5
};

// Yahan apni Google AI Studio ki key daalein (AIza... wali)
const GOOGLE_API_KEY = "AIzaSyAOiEgXphvf3yn9vtt-sGT_Sld-hhtbwr4";

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");

    // Check agar user ne image reply nahi ki
    if (!event.messageReply?.attachments?.[0] || event.messageReply.attachments[0].type !== "photo") {
      return api.sendMessage("❌ Kisi image ko reply karo.", event.threadID);
    }

    // Check agar prompt nahi diya
    if (!prompt) {
      return api.sendMessage("❌ Prompt likho (example: make him a boy, change dress).", event.threadID);
    }

    const imgUrl = event.messageReply.attachments[0].url;
    api.sendMessage("🧠 Nano AI image ko samajh raha hai...", event.threadID);

    // 1. Image Download aur Base64 mein convert karna
    const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imgResponse.data, "binary").toString("base64");

    // 2. Gemini 1.5 Flash se image analyze karwa kar ek perfect Master Prompt banana
    const visionApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
    
    const visionPayload = {
      contents: [{
        parts: [
          { text: `Describe this image in extreme detail (character, background, lighting). Then modify the description based on this instruction: "${prompt}". Return ONLY the final detailed prompt in English for an image generator, nothing else.` },
          { inlineData: { mimeType: "image/jpeg", data: base64Image } }
        ]
      }]
    };

    const visionRes = await axios.post(visionApiUrl, visionPayload);
    const masterPrompt = visionRes.data.candidates[0].content.parts[0].text.trim();

    api.sendMessage(`✨ Image analyze ho gayi. Editing shuru ho rahi hai...\n(Generating: ${prompt})`, event.threadID);

    // 3. Google Imagen 3 API se Nayi Image Generate karna
    const imagenApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict`;
    
    const imagenPayload = {
      instances: [{ prompt: masterPrompt }],
      parameters: { sampleCount: 1 }
    };

    const imagenRes = await axios.post(imagenApiUrl, imagenPayload, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GOOGLE_API_KEY
      }
    });

    // 4. Base64 Output nikalna aur save karna
    const generatedBase64 = imagenRes.data.predictions[0].bytesBase64Encoded;
    const outPath = path.join(__dirname, "cache", `nano_out_${Date.now()}.png`);
    
    fs.writeFileSync(outPath, Buffer.from(generatedBase64, "base64"));

    // 5. User ko final image bhejna
    api.sendMessage(
      {
        body: `✨ Nano Edit Done!\n📝 User Prompt: ${prompt}`,
        attachment: fs.createReadStream(outPath)
      },
      event.threadID,
      () => {
        // Cache se image delete kar dena taake storage full na ho
        if (fs.existsSync(outPath)) {
            fs.unlinkSync(outPath);
        }
      }
    );

  } catch (err) {
    console.error(err.response?.data || err.message);
    
    let errorMsg = err.message;
    if (err.response?.data?.error?.message) {
        errorMsg = err.response.data.error.message;
    }

    api.sendMessage(
      `❌ Error: ${errorMsg}\n\n⚠️ Check karein ke aapki Google API key theek hai.`,
      event.threadID
    );
  }
};
