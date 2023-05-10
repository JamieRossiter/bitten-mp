function Game_Room(){
    this.initialize();
}

Game_Room.prototype.initialize = function(){
    this._code = "";
    this._players = new Set();
}

Game_Room.prototype.addPlayer = function(player){
    this._players.add(player);
}

Game_Room.prototype.removePlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);

    if(!targetPlayer) return;
    this._players.delete(targetPlayer);
}

const $gameRoom = new Game_Room();