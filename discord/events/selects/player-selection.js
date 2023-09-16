const _roles = require('../roles');

module.exports = async (interaction, db) => {
  try {
    const gameModel = new db.Game()
    const playerModel = new db.Player()

    const player = await playerModel.isPlayerExist(interaction)
    const player_role = player.role
    const game = await player.getGame()
    const target = await playerModel.getPlayer(interaction.values[0])
    const role = _roles[player_role]
    if (role === 'sniper')
      role.onAction(db, game.channelId, target, player_id=interaction.user.id);
    else
      role.onAction(db, game.channelId, target);

  } catch (e) {
    console.log(e)
  }
}
