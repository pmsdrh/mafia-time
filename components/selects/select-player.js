const client = require('../../client');
module.exports = async (filter, interaction, db) => {
  try {
    const player = db.Player()
    let players = await player.alives(interaction)
    players = players.filter(filter);
    const players_list = []
    players.forEach((i) => {
      user = client.users.fetch(i.userId).then(r => {
        players_list.push(new StringSelectMenuOptionBuilder()
          .setLabel(user.username)
          .setDescription('...')
          .setValue(user.id))
      })
    });

  } catch (e) {

  }
}
