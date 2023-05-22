/** 
 * @class
 * @description A representation of the player lobby.
*/
function Game_Lobby(){
    this.initialize(...arguments);
}

Game_Lobby.prototype.initialize = function(){
    this._phase = "prompt";
}

Game_Lobby.prototype.update = function(){

    switch(this._phase){
        case "prompt":
            this.showPrompts();
            this._phase = "loading"
        break;

        case "loading":
            if($gameServer.isConnected){
                this._phase = "joined";
            } else if($gameServer.isError){
                this.showMessage("There was an error while trying to connect to the server!");
                this._phase = "prompt";
            }
        break;

        case "joined":
            return;
        break;
    }

}

Game_Lobby.prototype.showMessage = function(message){
    window.alert(message);
}

/** 
 * @public @method
 * @returns {void}
 * @description Displays the prompts for connecting to the server when the player enters the lobby.
*/
Game_Lobby.prototype.showPrompts = function(){
    const username = window.prompt("Please enter your username.");
    const roomCode = window.prompt("Please enter the room code.");

    let isHost = false;
    if(!roomCode) isHost = true;

    const playerPosition = JSON.stringify({x: $gamePlayer.x, y: $gamePlayer.y, dir: $gamePlayer.direction()}).trim();
    $gameServer.connect(username, isHost, roomCode, playerPosition);
}

Game_Lobby.prototype.handleRoomNoExist = function(roomCode){
    this._phase = "loading";
    $gameServer.handleError();
    this.showMessage(`Room with code ${roomCode} does not exist!`);
}


Object.defineProperties(Game_Lobby.prototype, {
    tag: {
        get(){
            return "lobby";
        }
    },
    phase: {
        get(){
            return this._phase;
        }
    }
})

const $gameLobby = new Game_Lobby();

const gameLobby_sceneMap_update_alias = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    gameLobby_sceneMap_update_alias.call(this);
    
    if(!$dataMap.note.includes($gameLobby.tag)) return;
    $gameLobby.update();
}
