const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const row = require('../../buttons/new-game.js')
const embeds = require('../../embeds/new-game.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('newgame')
		.setDescription('شروع بازی جدید'),
	async execute(interaction, db) {
		await db.Game.create({
			gameId: 'test',
			channelId: interaction.channelId
		})
		await interaction.reply({
			embeds: [embeds(interaction.user)],
			components: [row],
		});
	},
};
