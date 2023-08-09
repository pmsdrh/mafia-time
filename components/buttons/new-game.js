const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const join = new ButtonBuilder()
.setCustomId('join')
.setLabel('پیوستن به بازی')
.setStyle(ButtonStyle.Primary);

const left = new ButtonBuilder()
.setCustomId('left')
.setLabel('خروج از بازی')
.setStyle(ButtonStyle.Danger);

const start = new ButtonBuilder()
.setCustomId('start')
.setLabel('شروع بازی')
.setStyle(ButtonStyle.Success);

const row = new ActionRowBuilder()
.addComponents(left, join, start);

module.exports = row
