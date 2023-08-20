
const fs = require('node:fs');
const path = require('node:path');
const { Collection, Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
const btnEvents = require('./discord/events/buttons')
const slcEvents = require('./discord/events/selects')
const db = require('./models');
const express = require('express');
const glob = require('glob');
const cors = require('cors');

(async () => {
	await db.sequelize.sync({});
})()
const client = require('./discord/client');

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'discord', 'commands');
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
	if (interaction.isStringSelectMenu()){
		try {
			await slcEvents[interaction.customId](interaction, db)
		} catch (e) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}
  if (interaction.isButton()) {
		try {
			await btnEvents[interaction.customId](interaction, db)
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

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiList = [];
glob.sync('./api/**/*.js').forEach(function(file) {
    apiList.push(require(path.resolve(file)));
});

apiList.forEach(d => {
    const h = new d(app, db);
    if (typeof h.setApi === 'function') {
        h.setApi();
    }
});
app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`))
