module.exports = {
  name: "مافیا",
  key: "mafia",
  descriptions: "تو مافیایی! سعی کن با همکاری مافیا های دیگه همه شهروندارو از بازی خارج کنی! هر شب میتونی یک شلیک انجام بدی",
  type: false,
  onNight: (interaction, client, userId, db) => {
  },
  onInquiry: (interaction) => {
    return '(تیم مافیا)نقش منفی!'
  }
}
