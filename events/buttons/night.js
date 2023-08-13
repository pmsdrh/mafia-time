const client = require('../../client');
module.exports = async (interaction, db) => {
  try {
    const player = new db.Player()
    await player.onNight(interaction, client, db)
  } catch (e) {
    console.log(e)
  }
}
