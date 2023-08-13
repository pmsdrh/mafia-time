const roles = require('../../events/roles');
const {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = async (interaction, db) => {
  try {
    const modalComponents = []
    game = await db.Game.findOne({where: {channelId: interaction.channelId}})
    game.roles.split(',').forEach((roleandn) => {
      role = roleandn.split('.')[0]
      const input = new TextInputBuilder()
      .setCustomId(role)
      .setLabel(roles[role].name)
      .setStyle(TextInputStyle.Short)
      .setMaxLength(2)
      .setMinLength(1)
      .setPlaceholder('تعداد' + roles[role].name)
      .setValue(roleandn.split('.')[1])
      modalComponents.push(new ActionRowBuilder().addComponents(input));
    });
    return new ModalBuilder()
    .setCustomId('roles-counter')
    .setTitle('انتخاب نقش ها')
    .addComponents(...modalComponents);
  } catch (e) {
    console.log(e);
  }
}
