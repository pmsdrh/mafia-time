
const fs = require('node:fs');
const path = require('node:path');
const { Collection, Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
const events = require('./events/buttons')
const db = require('./database/models')

const client = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, async () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	console.log(interaction);
  if (interaction.isButton()) {
		try {
			await events[interaction.customId](interaction, db)
		} catch (e) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
  }

  if (interaction.isChatInputCommand()) {
    	const command = client.commands.get(interaction.commandName);

    	if (!command) return;

    	try {
    		await command.execute(interaction, db);
    	} catch (error) {
    		console.error(error);
    		if (interaction.replied || interaction.deferred) {
    			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    		} else {
    			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    		}
    	}
  }
});

client.login(process.env.CLIENT_TOKEN);