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
        },
        gameToken: {
          type: DataTypes.STRING,
        }
    });

    Game.prototype.getCache = async (gameId) => {
      const game = await Game.findOne({where: {channelId: gameId}})
      return JSON.parse(game.cache);
    }

    Game.prototype.createGame = function(interaction) {
      let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let token = ''
      for ( var i = 0; i < 16; i++ ) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      Game.create({
          channelId: interaction.channelId,
          creator: interaction.user.id,
          gameToken: token
        });
    };
    Game.prototype.setCache = async (key, value, gameId) => {
      const game = await Game.findOne({where: {channelId: gameId}})
      let cache = JSON.parse(game.cache)
      cashe[key] = value
      Game.update({cache: JSON.stringify(cache)}, {
         where: {
           channelId: gameId
         }
       })
    }
    Game.prototype.setRoles = (interaction) => {
      const roles = []
      interaction.values.forEach(i => {
        roles.push(i + '.1')
      });
      Game.update({roles: roles.join(',')}, {
        where: {
          channelId: interaction.channelId
        }
      })
    }
    Game.prototype.editRoles = (roles, interaction) => {
      Game.update({roles:roles}, {where: {channelId: interaction.channelId}})
    }
    Game.prototype.link = async (interaction) => {
      const game = await Game.findOne({
        where: {
          channelId: interaction.channelId
        }
      })
      const url = "https://mafiatime.iran.liara.run"
      return `${url}/${game.gameToken}/${game.channelId}/${game.creator}`
    }
    Game.prototype.isGameExist = async function(interaction) {
      return await Game.findOne({where: {channelId: interaction.channelId}})
      .then(r => {
        return r
      });
    };
    Game.prototype.validator = async (token, gameId, creator) => {
      const validate = await Game.findOne({
        where: {
          channelId: gameId,
          creator: creator,
          gameToken: token
        }
      })
      return await validate
    }
    Game.prototype.isGameCreator = async function(interaction) {
      return await Game.findOne({where: {channelId: interaction.channelId}})
      .then(r => {
        if (r){
          if (r.creator === interaction.user.id) return true;
          return false;
        }
      });
    };
    Game.prototype.removeGame = (interaction) => {
      try {
        sequelize.models.Player.destroy({
          where: {
            GameChannelId: interaction.channelId
          }
        })
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
