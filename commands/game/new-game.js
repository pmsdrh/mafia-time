const { ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const row = require('../../components/buttons/new-game.js')
const embeds = require('../../components/embeds/new-game.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('newgame')
		.setDescription('شروع بازی جدید'),
	async execute(interaction, db) {
		try {
			game = new db.Game()
			if (await game.isGameExist(interaction)) return await interaction.reply('هم اکنون یک بازی در حال اجرا است');
			game.createGame(interaction)
			await interaction.reply({
				embeds: [embeds(interaction.user)],
				components: [row],
			});
		} catch (e) {
			console.log(e)
		}
	},
};
