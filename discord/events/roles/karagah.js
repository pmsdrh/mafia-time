const player_list = require('../../components/selects/select-player')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: "کارآگاه",
  key: "karagah",
  descriptions: "تو کارآگاهی! هر شب میتونی استعلام یه نفرو بگیری تا بهت بگم نقشش چیه. فقط حواست باشه لو نری",
  type: true,
  onNight: async (interaction, client, userId, db) => {
    interaction.reply({content: 'خب یکی از بازیکنارو انتخاب کن تا بهت بگم نقشش چیه',
    components:[await player_list((value) => {
      return value.userId !== userId
    }, interaction, db)]})
    .then(async msg => {
      await wait(60000)
      await msg.delete()
    });
  },
  onAction: (cache, selected, interaction, db) => {
    interaction.reply('نقش این بازیکن: ')

    return cache
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
