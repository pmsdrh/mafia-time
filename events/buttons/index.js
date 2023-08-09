module.exports = {
  join : async (interaction, db) => {
    try {
      const user = interaction.user;

  		interaction.reply(`کاربر <@${user.id}> با موفقیت وارد شد!`)
    } catch (e) {
      console.log(e)
    }
  },
  left : async (interaction, db) => {

  },
  start : (interaction, db) => {

  }
}
