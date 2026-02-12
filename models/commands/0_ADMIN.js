const fs = require("fs-extra");
const { resolve } = require("path");

/* ================= SYSTEM BOX DESIGN ================= */

function systemBox(title, text) {
  return `╭─── ${title} ───╮\n\n${text}\n\n╰─────────────────╯`;
}

const ADMIN_BOX = (text) => systemBox("🎀 〔 ADMIN SYSTEM 〕", text);
const SECURITY_BOX = (text) => systemBox("🔥 〔 SECURITY MODE 〕", text);
const BOT_BOX = (text) => systemBox("🤖 〔 BOT STATUS 〕", text);

/* ================= CONFIG ================= */

module.exports.config = {
  name: "admin",
  version: "3.1.0",
  hasPermssion: 0,
  credits: "SHAAN BABU",
  description: "Admin / Security / Bot Manager (Only & Public Mode)",
  commandCategory: "Admin",
  usages: "admin [list/add/remove/only/public]",
  cooldowns: 3
};

/* ================= ON LOAD ================= */

module.exports.onLoad = () => {
  const path = resolve(__dirname, "cache", "data.json");
  if (!fs.existsSync(path)) {
    if (!fs.existsSync(resolve(__dirname, "cache"))) fs.mkdirSync(resolve(__dirname, "cache"));
    fs.writeFileSync(path, JSON.stringify({ adminbox: {} }, null, 4));
  }
};

/* ================= RUN ================= */

module.exports.run = async function ({
  api,
  event,
  args,
  Users,
  permssion
}) {
  const { threadID, messageID, mentions } = event;
  const configPath = global.client.configPath;

  // Cache clear taaki settings turant update hon
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  config.ADMINBOT = config.ADMINBOT || [];
  config.NDH = config.NDH || [];

  const mentionIDs = Object.keys(mentions || {});

  /* ================= HELP MENU ================= */

  if (!args[0]) {
    return api.sendMessage(
      ADMIN_BOX(
        "ADMIN COMMANDS\n\n" +
          "• admin list - Admins ki list dekhne ke liye\n" +
          "• admin add @tag - Naya admin banane ke liye\n" +
          "• admin remove @tag - Admin hatane ke liye\n" +
          "• admin only - Sirf Admin mode ON 🔒\n" +
          "• admin public - Sabke liye bot ON 🔓\n" +
          "• admin qtvonly - Group Admin mode"
      ),
      threadID,
      messageID
    );
  }

  /* ================= SWITCH ================= */

  switch (args[0]) {
    /* ===== LIST ===== */
    case "list": {
      let adminText = "";
      let ndhText = "";

      for (const id of config.ADMINBOT) {
        const name = (await Users.getData(id)).name || id;
        adminText += `• ${name} (${id})\n`;
      }

      for (const id of config.NDH) {
        const name = (await Users.getData(id)).name || id;
        ndhText += `• ${name} (${id})\n`;
      }

      return api.sendMessage(
        BOT_BOX(
          "👑 ADMINS\n" +
            (adminText || "None") +
            "\n🤖 SUPPORT\n" +
            (ndhText || "None")
        ),
        threadID,
        messageID
      );
    }

    /* ===== ADD ADMIN ===== */
    case "add": {
      if (permssion != 3)
        return api.sendMessage(SECURITY_BOX("Permission Denied ❌"), threadID, messageID);

      const ids = mentionIDs.length > 0 ? mentionIDs : event.messageReply ? [event.messageReply.senderID] : [];
      if (!ids.length) return api.sendMessage("Kisine tag karein ya reply karein!", threadID, messageID);

      for (const id of ids) {
        if (!config.ADMINBOT.includes(id)) config.ADMINBOT.push(id);
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(ADMIN_BOX(`Successfully added ${ids.length} Admin(s) ✅`), threadID, messageID);
    }

    /* ===== REMOVE ADMIN ===== */
    case "remove": {
      if (permssion != 3)
        return api.sendMessage(SECURITY_BOX("Permission Denied ❌"), threadID, messageID);

      const ids = mentionIDs.length > 0 ? mentionIDs : event.messageReply ? [event.messageReply.senderID] : [];
      for (const id of ids) {
        const index = config.ADMINBOT.indexOf(id);
        if (index !== -1) config.ADMINBOT.splice(index, 1);
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(ADMIN_BOX(`Successfully removed ${ids.length} Admin(s) ❌`), threadID, messageID);
    }

    /* ===== ADMIN ONLY (ENABLE) ===== */
    case "only": {
      if (permssion != 3)
        return api.sendMessage(SECURITY_BOX("Permission Denied ❌"), threadID, messageID);

      config.adminOnly = true; 
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        SECURITY_BOX("Admin Only Mode ENABLED 🔒\nAb bot sirf admins ke liye hai."),
        threadID,
        messageID
      );
    }

    /* ===== ADMIN PUBLIC (DISABLE) ===== */
    case "public": {
      if (permssion != 3)
        return api.sendMessage(SECURITY_BOX("Permission Denied ❌"), threadID, messageID);

      config.adminOnly = false; 
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        SECURITY_BOX("Admin Only Mode DISABLED 🔓\nAb sabhi users bot use kar sakte hain."),
        threadID,
        messageID
      );
    }

    /* ===== QTV ONLY (GROUP ADMIN) ===== */
    case "qtvonly": {
      const dataPath = resolve(__dirname, "cache", "data.json");
      const data = require(dataPath);

      data.adminbox[threadID] = !data.adminbox[threadID];
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

      return api.sendMessage(
        SECURITY_BOX(
          data.adminbox[threadID]
            ? "QTV Only Mode ENABLED 🔥"
            : "QTV Only Mode DISABLED ❄️"
        ),
        threadID,
        messageID
      );
    }

    default:
      return api.sendMessage(BOT_BOX("Invalid Admin Command ❌"), threadID, messageID);
  }
};
