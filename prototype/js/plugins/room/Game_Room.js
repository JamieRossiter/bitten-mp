/** 
 * @class
 * @description Client-side representation of a server room. 
 * A subset of the server that holds a group of common players together.
*/
function Game_Room(){
    this.initialize();
}

/**
 * @private @method
 */
Game_Room.prototype.initialize = function(){
    /**
     * @private @field
     * @type {string}
     */
    this._code = "";

    /**
     * @private @field
     * @type {Set<Game_Player>}
     */
    this._players = new Set();

    /**
     * @private @field
     * @type {Game_OnlinePlayer}
     * @desc This game instance's controlling player
     */
    this._currentPlayer = null;
}

/**
 * @public @method
 * @arg {Game_OnlinePlayer} player 
 */
Game_Room.prototype.addPlayer = function(player){
    this._players.add(player);
}

/**
 * @public @method
 * @arg {string} id 
 */
Game_Room.prototype.removePlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);

    if(!targetPlayer){
        // Handle error
        return;
    }
    this._players.delete(targetPlayer);
}

/**
 * @public @method
 * @arg {string} id 
 * @returns {Game_Player}
 */
Game_Room.prototype.findPlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);
    return targetPlayer;
}

/**
 * @public @method
 * @arg {string} code 
 */
Game_Room.prototype.setCode = function(code){
    this._code = code;
}

/**
 * @public @method
 * @arg {Game_OnlinePlayer} player 
 */
Game_Room.prototype.setCurrentPlayer = function(player){
    this._currentPlayer = player;
}

/**
 * @public @method
 * @arg { {x: number, y: number, dir: number} } coords 
 * @desc Broadcasts that the player has moved straight to the room
 */
Game_Room.prototype.broadcastPlayerMoveStraight = function(coords){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.PlayerMoveStraight, 
        { PlayerId: this._currentPlayer.id, X: coords.x, Y: coords.y, Dir: coords.dir }
    );
}

/**
 * @public @method
 * @arg {Game_Event} mapEvent
 * @arg {Game_OnlinePlayer} onlinePlayer
 */
Game_Room.prototype.joinGame = function(mapEvent, onlinePlayer){
    onlinePlayer.setMapEvent(mapEvent);   
    onlinePlayer.createUsernameWindow();
    onlinePlayer.mapEvent.setTransparent(false);
    onlinePlayer.mapEvent.setPattern(2);
    onlinePlayer.mapEvent.setPosition(8, 6);
    $gameRoom.addPlayer(onlinePlayer);
}

/**
 * @public @method
 * @arg {Game_OnlinePlayer} onlinePlayer
 */
Game_Room.prototype.leaveGame = function(onlinePlayer){
    onlinePlayer.mapEvent.setTransparent(true);
    onlinePlayer.mapEvent.setPosition(-100, -100);
    onlinePlayer.destroyUsernameWindow();
    this.removePlayerById(onlinePlayer.id);
}

Object.defineProperties(Game_Room.prototype, {
    /**
     * @public @property
     * @type {string}
     */
    code: {
        get(){
            return this._code;
        }
    },

    /**
     * @public @property
     * @type {Game_OnlinePlayer}
     */
    currentPlayer: {
        get(){
            return this._currentPlayer;
        }
    }
})

const $gameRoom = new Game_Room();