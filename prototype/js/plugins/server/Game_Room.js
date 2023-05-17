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
    this._currentPlayer = null;
}

Game_Room.prototype.addPlayer = function(player){
    this._players.add(player);
}

Game_Room.prototype.removePlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);

    if(!targetPlayer){
        // Handle error
        return;
    }
    this._players.delete(targetPlayer);
}

Game_Room.prototype.findPlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);
    return targetPlayer;
}

Game_Room.prototype.code = function(){
    return this._code;
}

Game_Room.prototype.setCode = function(code){
    this._code = code;
}

Game_Room.prototype.setCurrentPlayer = function(player){
    this._currentPlayer = player;
}

// TODO: Run this method in execute move or similar method
Game_Room.prototype.broadcastPlayerPositionUpdate = function(coords){
    $gameServer.sendMessage(
        BroadcastMessageEventCode.PlayerUpdatePosition, 
        { PlayerId: this._currentPlayer.id, X: coords.x, Y: coords.y, Dir: coords.dir },
        this._code
    );
}

Game_Room.prototype.joinGame = function(mapEvent, onlinePlayer){
    onlinePlayer.setMapEvent(mapEvent);   
    onlinePlayer.createUsernameWindow();
    onlinePlayer.mapEvent.setTransparent(false);
    onlinePlayer.mapEvent.setPattern(2);
    onlinePlayer.mapEvent.setPosition(8, 6);
    $gameRoom.addPlayer(onlinePlayer);
}

Game_Room.prototype.leaveGame = function(onlinePlayer){
    onlinePlayer.mapEvent.setTransparent(true);
    onlinePlayer.mapEvent.setPosition(-100, -100);
    onlinePlayer.mapEvent.destroyUsernameWindow();
    this.removePlayerById(onlinePlayer.id);
}

Object.defineProperty(Game_Room.prototype, "currentPlayer", {
    get(){
        return this._currentPlayer;
    }
})

const $gameRoom = new Game_Room();