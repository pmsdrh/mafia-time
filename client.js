const { Collection, Client, Events, GatewayIntentBits } = require('discord.js');
module.exports = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
] });
