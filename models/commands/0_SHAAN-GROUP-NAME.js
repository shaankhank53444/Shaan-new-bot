module.exports.config = {
	name: "groupname",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "SHAAN BABU",
	description: "THIS BOT WAS MADE BY MR SHAAN BABU",
	commandCategory: "CHANGE GROUP NAME", 
	usages: "PREFIX", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("BOSS SAATH ME GROUP KANAME LIKHO JO AAP RAKHNA CHAHTA HO 😐✌️", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`AB IS GROUP KA NAME YAHI HA 👉 ${name}\n━━━━━━━━━━━━━━━━━━━━━━━\nOWNER  𒁍 MR SHAAN BABU 🌺`, event.threadID, event.messageID));
}
