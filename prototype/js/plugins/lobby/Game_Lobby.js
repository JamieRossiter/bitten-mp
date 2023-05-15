/** 
 * @class
 * @description A representation of the player lobby.
*/
function Game_Lobby(){
    this.initialize();
}

Game_Lobby.prototype.initialize = function(){
    this._isActive = false;
}

Game_Lobby.prototype.showPrompts = function(){
    if(!this._isActive) return;

    const username = window.prompt("Please enter your username.");
    const roomCode = window.prompt("Please enter the room code.");

    let isHost = false;
    if(!roomCode) isHost = true;

    $gameServer.connect(username, isHost, roomCode);
}

Game_Lobby.prototype.setActive = function(active){
    this._isActive = active;
}

const $gameLobby = new Game_Lobby();

/** 
 * @external
 * @description Aliases the Scene_Map start method
*/
const gameLobby_sceneMap_start_alias = Scene_Map.prototype.start;
Scene_Map.prototype.start = function(){
    gameLobby_sceneMap_start_alias.call(this);

    // Lobby object can only be used when the player is on a lobby map
    if($dataMap.note.includes("lobby")){
        $gameLobby.setActive(true);
    } else {
        $gameLobby.setActive(false);
    }
}
