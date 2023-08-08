'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {

    }
  }
  Player.init({
    userId: DataTypes.STRING,
    gameId: DataTypes.STRING,
    isAlive: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
