module.exports = {
  join : async (interaction, db) => {
    const user = interaction.user;
		interaction.reply(`کاربر ${user} با موفقیت وارد شد!`)
  },
  left : async (interaction, db) => {

  },
  start : (interaction, db) => {

  }
}
