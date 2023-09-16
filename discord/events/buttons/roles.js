
module.exports = async (interaction, db) => {
  try {
    const game = new db.Game()
    if (! await game.isGameExist(interaction)) return await interaction.reply('این بازی منقضی شده است!');
    if (! await game.isGameCreator(interaction))
      return await interaction.reply({content: ' سازنده بازی به این گزینه دسترسی داره!', ephemeral: true});

    interaction.reply({
    content: `${await game.link(interaction)}\nاین لینک را با هیچ کس به اشتراک نگذارید!`,
    ephemeral: true})

  } catch (e) {
    console.log(e)
  }
}
