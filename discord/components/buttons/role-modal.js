const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const selectRole = new ButtonBuilder()
.setCustomId('roles')
.setLabel('تنظیمات نقش ها')
.setStyle(ButtonStyle.Primary);

const sorting = new ButtonBuilder()
.setCustomId('sorting')
.setLabel('پخش کردن نقش ها(!)')
.setStyle(ButtonStyle.Success);

const night = new ButtonBuilder()
.setCustomId('night')
.setLabel('شب')
.setStyle(ButtonStyle.Secondary);

const day = new ButtonBuilder()
.setCustomId('day')
.setLabel('روز')
.setStyle(ButtonStyle.Primary);

const players_list = new ButtonBuilder()
.setCustomId('players')
.setLabel('لیست بازیکنان')
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder()
.addComponents(selectRole, sorting, night, day, players_list);

module.exports = row
