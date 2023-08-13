const roles = {}
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const role = require(path.join(__dirname, file));
    roles[role.key] = role
  });

module.exports = roles
