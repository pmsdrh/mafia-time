const roles = require('./roles');

class Calculate {
  constructor(cache, db) {
    this.cache = cache
    this.db = db
    this.deads = []
  }
  mafiaShoot(){
    if (typeof this.cache.mafia_shoot !== 'undefined' || typeof this.cache.godfather_shoot !== 'undefined'){
      let shoot;
      (typeof this.cache.godfather_shoot !== 'undefined') ? shoot = this.cache.godfather_shoot : shoot = this.cache.mafia_shoot;
      if (this.cache.doctor_save !== shoot){
        this.deads.push(shoot);
      }
    }
  }
  async sniperShoot(){
    if (typeof this.cache.sniper_shoot !== 'undefined') {
      const playerModel = new db.Player();
      const players = this.cache.sniper_shoot.split(',');
      const player = await player.getPlayer(players[0]);
      const role = player.role;
      if (role === 'godfather') return;
      if(roles[role].type){
        this.deads.push(players[1]);
      } else {
        this.deads.push(players[0]);
      }
    }
  }
  async setHandler(){
    this.mafiaShoot();
    await this.sniperShoot();
    return this.deads;
  }
}
