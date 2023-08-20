class getRoles {
  constructor(app, db) {
    this.app = app
    this.db = db
  }
  setApi(){
    this.app.get('/api/:token/:gameId/:creator/roles', async (req, res) => {
      const {token, gameId, creator} = req.params
      const game = new this.db.Game()
      const validate = await game.validator(token, gameId, creator)
      if (!validate) return res.json({ok: false})
      if (!validate.roles) return res.json({ok: true, result: []})
      let result = validate.roles.split(',')
      .map(x => x.split('.'))
      .map(x => [x[0], parseInt(x[1])]);

      res.json({ok: true, result: result})

    });

  }
}
module.exports = getRoles;
