const client = require('../../client');
module.exports = async (interaction, db) => {
  try {
    const game = new db.Game()
    if (! await game.isGameExist(interaction)) return await interaction.reply('این بازی منقضی شده است!');
    if (! await game.isGameCreator(interaction)) return await interaction.reply({content: ' سازنده بازی به این گزینه دسترسی داره!', ephemeral: true});
    const player = new db.Player()
    await player.onNight(interaction, client, db)
    interaction.reply('خب همه شصت ثانیه مهلت دارین تا هر کاری که میخواینو انجام بدین! شب بخیر')
  } catch (e) {
    console.log(e)
  }
}
