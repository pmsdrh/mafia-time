module.exports = {
  name: "کارآگاه",
  key: "karagah",
  descriptions: "تو کارآگاهی! هر شب میتونی استعلام یه نفرو بگیری تا بهت بگم نقشش چیه. فقط حواست باشه لو نری",
  type: true,
  onNight: async (interaction, client, userId, db) => {
    interaction.reply({content: 'خب یکی از بازیکنارو انتخاب کن تا بهت بگم نقشش چیه'})
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
