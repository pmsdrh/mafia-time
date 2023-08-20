module.exports = async (interaction, db) => {
  try {
    const user = interaction.user;
    const player = new db.Player();
    if(await player.isPlayerExist(interaction)) return interaction.reply('شما در بازی حضور دارید!');
    if(! await player.onJoin(interaction)) return interaction.reply('این بازی منقضی شده است!');
    interaction.reply(`کاربر <@${user.id}> با موفقیت وارد شد!`);
  } catch (e) {
    console.log(e)
  }
}
