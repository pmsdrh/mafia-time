'use strict';
module.exports = function(sequelize, DataTypes) {
    const Roles = sequelize.define('Roles', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptions: {
          type: DataTypes.TEXT(),
          allowNull: false,
        }
    });

    Roles.prototype.newRole = function(id, name, descriptions) {
      try {
        Roles.Create({
          id: id,
          name: name,
          descriptions: descriptions
        });
      } catch (e) {
        console.log(e);
      }
    };

    Roles.associate = function(models) {

    };

    return Roles;
};
