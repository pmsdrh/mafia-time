module.exports = {
  name: "گاد فادر",
  key: "godfather",
  descriptions: "تو گاد فادری! تو تیم مافیایی با این تفاوت که استعلامت دفعه اول منفیه!",
  type: false,
  onNight: (interaction, client, userId, db) => {
    client.users.send(userId ,{content: 'خب یکی از بازیکنارو انتخاب کن تا نجاتش بدی!'})
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
