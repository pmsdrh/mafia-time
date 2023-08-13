module.exports = async (interaction, db) => {
  try {
    game = new db.Game()
    if (! await game.isGameExist(interaction)) return await interaction.reply('این بازی منقضی شده است!');
    if (! await game.isGameCreator(interaction)) return await interaction.reply({content: 'فقط سازنده بازی امکان شروع رو داره', ephemeral: true});
    interaction.message.delete()
    interaction.reply({content: 'خب حالا نقش هایی که میخوای به بازی اضافه شنو وارد کن! حواست باشه نمیتونی بیشتر از تعداد بازیکنات نقش انتخاب کنی و گرنه بازیت بهم میریزه!', components:[require('../../components/selects/select-roles.js')] })
  } catch (e) {
    console.log(e)
  }
}
