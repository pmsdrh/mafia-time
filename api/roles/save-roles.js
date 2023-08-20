class saveRoles {
  constructor(app, db) {
    this.app = app
    this.db = db
  }
  setApi(){
    this.app.get('/api/:token/:gameId/:creator/roles/:set', async (req, res) => {
      const {token, gameId, creator, set} = req.params
      const game = new this.db.Game()
      const validate = await game.validator(token, gameId, creator)
      if (!validate) return res.json({ok: false})
      this.db.Game.update({roles: set}, {where: { channelId: gameId}})
      return res.json({ok: true, result: 'با موفقیت ذخیره شد'})
    });

  }
}
module.exports = saveRoles;
