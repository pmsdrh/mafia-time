'use strict';
const roles_event = require('../discord/events/roles');
module.exports = function(sequelize, DataTypes) {
    const Player = sequelize.define('Player', {
        userId: {
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'shahrvand'
        },
        isAlive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
    });

    Player.prototype.onNight = async (interaction, client, db) => {
      try {
        const game = await sequelize.models.Game.findOne({
          where: {
            channelId: interaction.channelId
          }
        })
        const players = await Player.findAll({
          where: {
            GameChannelId: interaction.channelId
          }
        })
        sequelize.models.Game.update({
          cache: '{}'
        }, {
          where: {
            channelId: interaction.channelId
          }
        })
        const roles = game.roles.split(',')
        .map(x => x.split('.'))
        roles.forEach((i) => {
          const role = i[0]
          Player.findOne({
            where: {
              GameChannelId: interaction.channelId,
              role: role,
              isAlive: true
            }
          }).then(async r => {
            if (!r) return;
            await roles_event[role].onNight(interaction, client, r.userId, db)
          })
        });

      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.alives = async (interaction) => {
      try {
        return await Player.findAll({
          where: {
            GameChannelId: interaction.channelId,
            isAlive: true
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.setRole = async (userId, role) => {
      try {
        Player.update({role: role}, {where: {userId: userId}})
      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.getPlayers = async (interaction) => {
      try {
        return await Player.findAll({
          where: {
            GameChannelId: interaction.channelId
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.getPlayer = async (userId) => {
      try {
        return await Player.findOne({where: {userId: userId}})
      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.isPlayerExist = async (interaction) => {
      try {
        return await Player.findOne({where: {userId: interaction.user.id}})
      } catch (e) {
        console.log(e)
      }
    }

    Player.prototype.onJoin = async function(interaction) {
      try {
        const game = await sequelize.models.Game.findOne({
          where: {
            channelId: interaction.channelId
          }
        })
        if (!game) return false;
        Player.create({
          userId: interaction.user.id,
          username: interaction.user.globalName,
          GameChannelId: game.channelId
        });
        return true
      } catch (e) {
        console.log(e);
      }
    };

    Player.associate = function(models) {
        Player.belongsTo(models.Game)
    };

    return Player;
};
