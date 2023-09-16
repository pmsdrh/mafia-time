const wait = require('node:timers/promises').setTimeout;
const player_list = require('../../components/selects/select-player')

module.exports = {
  name: "اسنایپر",
  key: "sniper",
  descriptions: "تو اسنایپری. تو تیم شهری ولی می تونی مجموعا دو بار شلیک کنی. اگه مافیا رو بزنی مافیا از بازی خارج میشه ولی اگه اشتباهی شهرو بزنی خودت می میری. راستی حواست باشه زورت به گاد فادر نمیرسه و اگه بزنیش هیچ اتفاقی نمیوفته!",
  type: true,
  onNight: async (interaction, client, userId, db) => {
    client.users.send(userId ,{
      content: 'خب اگه دوس داری می تونی امشب یه شلیک انجام بدی!',
      components:[await player_list((value) => {
        return value.userId !== userId
      }, interaction, db)]})
      .then(async msg => {
        await wait(60000)
        await msg.delete()
      });
  },
  onAction: async (db, gameId, target, player_id) => {
    const game = db.Game()
    await game.setCache('sniper_shoot', `${target},${player_id}`, gameId)
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
