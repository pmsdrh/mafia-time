module.exports = async (interaction, db) => {
  try {
    const player = new db.Player()
    let list = "لیست بازیکنان: \n"
    if (! await game.isGameExist(interaction)) return await interaction.reply('این بازی منقضی شده است!');
    const players = await player.getPlayers(interaction);
    players.map(i => {
      list += `<@${i.userId}> ${(i.isAlive) ? 'زنده' : 'مرده'}`
    })
    interaction.reply(list)

  } catch (e) {
    console.log(e)
  }
}
