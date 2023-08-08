'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.hasMany(models.Player);
    }
  }
  Game.init({
    gameId: DataTypes.STRING,
    channelId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
