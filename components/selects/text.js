const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

const select = new StringSelectMenuBuilder()
  .setCustomId('starter')
  .setPlaceholder('Make a selection!')
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel('Bulbasaur')
      .setDescription('The dual-type Grass/Poison Seed Pokémon.')
      .setValue('bulbasaur'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Charmander')
      .setDescription('The Fire-type Lizard Pokémon.')
      .setValue('charmander'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Squirtle')
      .setDescription('The Water-type Tiny Turtle Pokémon.')
      .setValue('squirtle'),)
  .setMinValues(1)
  .setMaxValues(3);;

const row = new ActionRowBuilder()
  .addComponents(select);

module.exports = row
