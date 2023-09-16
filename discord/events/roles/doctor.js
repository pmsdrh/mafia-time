const player_list = require('../../components/selects/select-player')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: "دکتر",
  key: "doctor",
  descriptions: "تو دکتری! هر شب می تونی یه نفرو سیو کنی!",
  type: true,
  onNight: async (interaction, client, userId, db) => {
    client.users.send(userId ,{
      content: 'خب یکی از بازیکنارو انتخاب کن تا نجاتش بدی!',
      components:[await player_list((value) => {
        return true
      }, interaction, db)]
    })
    .then(async msg => {
      await wait(60000)
      await msg.delete()
    })
  },
  onAction: (db, gameId, target) => {
    const game = db.Game()
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
