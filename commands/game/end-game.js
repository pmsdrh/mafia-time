const {SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('endgame')
		.setDescription('پایان بازی'),
	async execute(interaction, db) {
		try {
			game = new db.Game()
			game.removeGame(interaction)
			await interaction.reply('بازی به اتمام رسید!');
		} catch (e) {
			console.log(e)
		}
	},
};
