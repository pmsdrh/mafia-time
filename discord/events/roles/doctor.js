module.exports = {
  name: "دکتر",
  key: "doctor",
  descriptions: "تو دکتری! هر شب می تونی یه نفرو سیو کنی!",
  type: true,
  onNight: (interaction, client, userId, db) => {
    client.users.send(userId ,{content: 'خب یکی از بازیکنارو انتخاب کن تا نجاتش بدی!'})
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت'
  }
}
