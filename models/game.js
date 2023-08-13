'use strict';
module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define('Game', {
        channelId: {
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false,
        },
        creator: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        roles: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "day"
        },
        cache: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "{}"
        },
        globalCache: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "{}"
        }
    });

    Game.prototype.createGame = function(interaction) {
      Game.create({
          channelId: interaction.channelId,
          creator: interaction.user.id
        });
    };

    Game.prototype.setRoles = (interaction) => {
      const roles = []
      interaction.values.forEach(i => {
        roles.push(i + '.1')
      });
      Game.update({roles:roles.join(',')}, {where: {channelId: interaction.channelId}})
    }
    Game.prototype.editRoles = (roles, interaction) => {
      Game.update({roles:roles}, {where: {channelId: interaction.channelId}})
    }

    Game.prototype.isGameExist = async function(interaction) {
      return await Game.findOne({where: {channelId: interaction.channelId}}).then(r => {
        return r
      });
    };
    Game.prototype.isGameCreator = async function(interaction) {
      return await Game.findOne({where: {channelId: interaction.channelId}}).then(r => {
        if (r){
          if (r.creator === interaction.user.id) return true;
          return false;
        }
      });
    };
    Game.prototype.removeGame = (interaction) => {
      try {
        sequelize.models.Player.destroy({where: {GameChannelId: interaction.channelId}})
        Game.destroy({where: {channelId: interaction.channelId}})
      } catch (e) {

      }
    }
    Game.associate = function(models) {
        // associations can be defined here
        Game.hasMany(models.Player);
    };

    return Game;
};
