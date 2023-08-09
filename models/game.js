'use strict';
module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define('Game', {
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Game.prototype.createGame = function(interaction) {
      Game.create({
          channelId: interaction.channelId,
          creator: interaction.user.id
        });
    };
    Game.prototype.isGameExist = async function(interaction) {
      return await Game.findOne({where: {channelId: interaction.channelId}}).then(r => {
        return r
      });
    };
    Game.prototype.isGameCreator = function(interaction) {
      return (Game.findOne({where: {channelId: interaction.channelId, creator: interaction.userId}})) ? true : false;
    };
    Game.prototype.removeGame = (interaction) => {
      try {
        Game.destroy({where: {channelId: interaction.channelId}})
      } catch (e) {

      }
    }
    Game.associate = function(models) {
        // associations can be defined here
        Game.hasMany(models.Player, {
            targetKey: 'userId'
        });
        Game.hasMany(models.Roles, {
            targetKey: 'id'
        });
    };

    return Game;
};
