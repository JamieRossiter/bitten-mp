/** 
 * @class
 * @description Client-side representation of a server room. 
 * A subset of the server that holds a group of common players together.
*/
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

Game_Room.prototype.code = function(){
    return this._code;
}

Game_Room.prototype.setCode = function(code){
    this._code = code;
}

const $gameRoom = new Game_Room();