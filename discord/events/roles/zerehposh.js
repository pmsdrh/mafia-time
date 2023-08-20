module.exports = {
  name: "زره پوش",
  key: "zerehposh",
  descriptions: "تو زره پوشی. به این راحتیا نمی میری و اگه دفه اول بهت شلیک کنن هیچیت نمیشه. ولی زرهت میشکنه و دفه دوم قطعا مردی.",
  type: true,
  onNight: (interaction, client, userId, db) => {
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
