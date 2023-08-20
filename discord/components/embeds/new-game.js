const { EmbedBuilder } = require('discord.js');

const newgame = (user) => {
  return new EmbedBuilder()
  	.setColor(0x0099FF)
  	.setTitle('بازی جدید')
  	.setDescription(`یک بازی جدید توسط ${user} ساخته شد!`)
  	.setTimestamp()
}

module.exports = newgame
