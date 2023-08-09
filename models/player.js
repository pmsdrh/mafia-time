'use strict';
module.exports = function(sequelize, DataTypes) {
    const Player = sequelize.define('Player', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Player.prototype.onJoin = function(interaction) {
      try {
        Player.Create({
          userId: interaction.user
        });
      } catch (e) {
        console.log(e);
      }
    };

    Player.associate = function(models) {
        Player.belongsTo(models.Roles, {
            targetKey: 'id'
        });
    };

    return Player;
};
