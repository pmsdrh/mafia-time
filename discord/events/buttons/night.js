const wait = require('node:timers/promises').setTimeout;
const client = require('../../client');
const Calculate = require('../calculate')
module.exports = async (interaction, db) => {
  try {
    const game = new db.Game()
    if (! await game.isGameExist(interaction)) return await interaction.reply('این بازی منقضی شده است!');
    if (! await game.isGameCreator(interaction))
      return await interaction.reply({content: ' سازنده بازی به این گزینه دسترسی داره!', ephemeral: true});
    const player = new db.Player()
    await player.onNight(interaction, client, db)
    await interaction.reply('خب همه شصت ثانیه مهلت دارین تا هر کاری که میخواینو انجام بدین! شب بخیر')
    .then(async msg => {
      await wait(70000)
      await msg.delete()
      const cache = await db.Game.getCache(interaction.channelId)
      const calc = new Calculate(cache)
      const deads = await calc.setHandler()
      deads.forEach(ply => {
        interaction.reply(`<@${ply}> مرد`)
      });
      
    });
  } catch (e) {
    console.log(e)
  }
}
