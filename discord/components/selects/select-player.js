const client = require('../../client');
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');

module.exports = async (filter, interaction, db) => {
  try {
    const player = new db.Player()
    let players = await player.alives(interaction)
    players = players.filter(filter);
    const players_list = []
    players.forEach((i) => {
      players_list.push(new StringSelectMenuOptionBuilder()
        .setLabel(i.username)
        .setDescription('انتخاب بازیکن')
        .setValue(i.userId))
    });
    console.log(players_list , 'lodddd');
    const select = new StringSelectMenuBuilder()
      .setCustomId('player-selection')
      .setPlaceholder('انتخاب بازیکن')
      .addOptions(...players_list)

    const row = new ActionRowBuilder()
      .addComponents(select);

    return row

  } catch (e) {
    console.log(e);
  }
}
