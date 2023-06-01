/** 
 * @class
 * @description A representation of the player lobby.
*/
function Game_Lobby(){
    this.initialize(...arguments);
}

/**
 * @private 
 */
Game_Lobby.prototype.initialize = function(){
    /**
     * @private 
     * @desc The functional phase that the lobby is in
     */
    this._phase = "prompt";
}

/**
 * @private 
 */
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

/**
 * @param {string} message 
 */
Game_Lobby.prototype.showMessage = function(message){
    window.alert(message);
}

/** 
 * @returns {void}
 * @description Displays the prompts for connecting to the server when the player enters the lobby.
*/
Game_Lobby.prototype.showPrompts = function(){
    const username = window.prompt("Please enter your username.");

    // Validate username
    if(!this.validatePromptInput(username)){
        this.showMessage("The entered username is not valid.");
        $gameServer.handleError();
        return;
    }

    const roomCode = window.prompt("Please enter the room code.");
    
    // Validate room code
    if (!this.validatePromptInput(roomCode)){
        this.showMessage("The entered room code is not valid.");
        $gameServer.handleError();
        return;
    }

    let isHost = false;
    if(!roomCode) isHost = true;

    const playerPosition = JSON.stringify({x: 8, y: 6, dir: $gamePlayer.direction()}).trim();
    $gameServer.connect(username, isHost, roomCode, playerPosition);
}

/**
 * @param {Role} role 
 */
Game_Lobby.prototype.assignRole = function(role){
    $gameRoom.broadcastPlayerRoleAssignment(role);
    $gameRoom.currentPlayer.setRole(role);
}

/**
 * @desc Tells the current player (must be a host) and every other player in the lobby to perform a map transfer to the game map in preparation for game start
 */
Game_Lobby.prototype.startGame = function(){
    if(!$gameRoom.currentPlayer.isHost){
        // Handle error
        return;
    }
    $gameRoom.broadcastMapTransfer(2, {x: 0, y: 0, dir: 2}); // Transfer other players to map
    $gamePlayer.reserveTransfer(2, 0, 0, 2, 0); // Transfer player to game map
}

/**
 * @param {string} roomCode 
 */
Game_Lobby.prototype.handleRoomNoExist = function(roomCode){
    this._phase = "loading";
    $gameServer.handleError();
    this.showMessage(`Room with code ${roomCode} does not exist!`);
}

/**
 * 
 * @param {string} promptInput 
 * @returns {boolean}
 */
Game_Lobby.prototype.validatePromptInput = function(promptInput){
    const input = promptInput ?? "";
    const trimmed = input.trim();
    const isAlphanumerical = RegExp(/[A-Z][a-z][0-9]/).test(trimmed);
    return (isAlphanumerical || trimmed) || input === "";
}

// FOR TESTING PURPOSES ONLY - THIS SHOULD BE IN THE MAIN GAME CLASS
Game_Lobby.prototype.activateNpcs = function(){
    $gameRoom.getNpcs().forEach(npc => npc.randomisePath())
    $gameRoom.broadcastActivateNpcs();
}

Object.defineProperties(Game_Lobby.prototype, {
    /**
     * @instance
     * @memberof Game_Lobby
     * @member {string}
     */
    tag: {
        get(){
            return "lobby";
        }
    },
    /**
     * @instance
     * @memberof Game_Lobby
     * @member {string}
     */
    phase: {
        get(){
            return this._phase;
        }
    }
})

const $gameLobby = new Game_Lobby();

const gameLobby_sceneMap_update_alias = Scene_Map.prototype.update;
/**
 * @external 
 * @desc Checks to see if the current map is the lobby map. If so, it calls update on the game lobby object's update method.
 */
Scene_Map.prototype.update = function(){
    gameLobby_sceneMap_update_alias.call(this);    

    if(!$dataMap.note.includes($gameLobby.tag)) return;
    $gameLobby.update();
}
