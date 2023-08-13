const wait = require('node:timers/promises').setTimeout;
module.exports = {
  name: "اسنایپر",
  key: "sniper",
  descriptions: "تو اسنایپری. تو تیم شهری ولی می تونی مجموعا دو بار شلیک کنی. اگه مافیا رو بزنی مافیا از بازی خارج میشه ولی اگه اشتباهی شهرو بزنی خودت می میری. راستی حواست باشه زورت به گاد فادر نمیرسه و اگه بزنیش میمیری!",
  type: true,
  onNight: (interaction, client, userId, db) => {
    client.users.send(userId ,{content: 'خب اگه دوس داری می تونی امشب یه شلیک انجام بدی!'}).then(async msg => {
      await wait(60000)
      await msg.delete()
    })
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
