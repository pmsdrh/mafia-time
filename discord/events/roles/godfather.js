const player_list = require('../../components/selects/select-player')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: "گاد فادر",
  key: "godfather",
  descriptions: "تو گاد فادری!\n" +
                " تو تیم مافیایی با این تفاوت که استعلامت دفعه اول منفیه.\n"+
                " در ضمن شلیک تو به مافیا اولویت داره. تازه اسنایپرم نمیتونه بزنتت!",
  type: false,
  onNight: async (interaction, client, userId, db) => {
    client.users.send(userId,
      {content: 'خب تو گادی و به هر حال تفنگ میگیری و شلیکت اولویت داره اما اگه دوس داری میتونی بزاری یکی از زیر دستات شلیکو انجام بده!',
      components:[await player_list((value) => {return value.role !== 'mafia'}, interaction, db)]})
    .then(async msg => {
      await wait(60000)
      await msg.delete()
    });
  },
  onAction: (db, gameId, target) => {
    const game = db.Game()
    game.setCache('godfather_shoot', target, gameId)
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
