const row = require('../../components/buttons/role-modal.js');
module.exports = async (interaction, db) => {
  try {
    game = new db.Game()
    if (! await game.isGameExist(interaction)) { interaction.message.delete(); return await interaction.reply('این بازی منقضی شده است!')};
    if (! await game.isGameCreator(interaction)) return await interaction.reply({content: 'فقط سازنده بازی میتونه نقش هارو انتخاب کنه!', ephemeral: true});
    interaction.message.delete()
    game.setRoles(interaction)

    await interaction.reply({content: 'تنظیمات بازی:',
     components:[row]});
  } catch (e) {
    console.log(e)
  }
}
