const client = require('../../client');
const role_events = require('../roles');
module.exports = async (interaction, db) => {
  try {
    const gameModel = new db.Game()
    if (! await gameModel.isGameExist(interaction))
     return await interaction.reply('این بازی منقضی شده است!');
    const game = await db.Game.findOne({where: {channelId: interaction.channelId}})
    const player = new db.Player()
    const players = await player.getPlayers(interaction)
    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    let roles = shuffle(game.roles.split(',')
    .map(x => x.split('.'))
    .map(x => [x[0], parseInt(x[1])]));

    players.some((i) => {
      if (!roles) return true;
      player.setRole(i.userId, roles[0][0])
      roles[0][1] -= 1
      client.users.send(i.userId, role_events[roles[0][0]].descriptions);
      if(roles[0][1] === 0) roles.shift()
      roles = shuffle(roles)
    });
  } catch (e) {
    console.log(e)
  }
}
