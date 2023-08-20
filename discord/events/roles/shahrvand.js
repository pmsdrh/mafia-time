module.exports = {
  name: "شهروند",
  key: "shahrvand",
  descriptions: "تو یه شهروند ساده ای! نمیتونی کار خاصی انجام بدی پس سعی کن با فکت هات شهرو نجات بدی!",
  type: true,
  onNight: (interaction, client, userId, db) => {
  },
  onInquiry: (interaction) => {
    return '(تیم شهر)نقش مثبت!'
  }
}
