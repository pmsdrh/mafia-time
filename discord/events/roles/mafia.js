const player_list = require('../../components/selects/select-player')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: "مافیا",
  key: "mafia",
  descriptions: "تو مافیایی! سعی کن با همکاری مافیا های دیگه همه شهروندارو از بازی خارج کنی! هر شب میتونی یک شلیک انجام بدی",
  type: false,
  onNight: async (interaction, client, userId, db) => {
    client.users.send(userId ,{content: 'خب تفنگ دست توعه بگو کیو بزنم؟',
    components:[await player_list((value) => {return value.role !== 'mafia'}, interaction, db)]})
    .then(async msg => {
      await wait(60000)
      await msg.delete()
    })
  },
  onAction: async (db, gameId, target) => {
    const game = db.Game()
    await game.setCache('mafia_shoot', target, gameId)
  },
  onInquiry: (interaction) => {
    return '(تیم مافیا)نقش منفی!'
  }
}
