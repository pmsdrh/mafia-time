module.exports = async (interaction, db) => {
  try {
    const fields = []
    interaction.fields.fields.map(x => {
      fields.push(`${x.customId}.${x.value}`)
    })
    const game = new db.Game()
    game.editRoles(fields.join(','), interaction);
    interaction.reply('با موفقیت تعداد نقش ها مشخص شد!')
  } catch (e) {
    console.log(e)
  }
}
