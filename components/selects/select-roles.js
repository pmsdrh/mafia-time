const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');
const roles = []

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

fs
  .readdirSync('./events/roles')
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const role = require(path.join(__dirname, `../../events/roles/${file}`));
    roles.push(new StringSelectMenuOptionBuilder()
      .setLabel(role.name)
      .setDescription(truncateString(role.descriptions, 90))
      .setValue(role.key))
  });

const select = new StringSelectMenuBuilder()
  .setCustomId('roles-selection')
  .setPlaceholder('انتخاب نقش ها')
  .addOptions(...roles)
  .setMinValues(1)
  .setMaxValues(roles.length);;

const row = new ActionRowBuilder()
  .addComponents(select);

module.exports = row
