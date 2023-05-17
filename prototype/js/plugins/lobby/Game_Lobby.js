/** 
 * @class
 * @description A representation of the player lobby.
*/
function Game_Lobby(){
    this.initialize();
}

Game_Lobby.prototype.initialize = function(){
}

Game_Lobby.prototype.showPrompts = function(){
    const username = window.prompt("Please enter your username.");
    const roomCode = window.prompt("Please enter the room code.");

    let isHost = false;
    if(!roomCode) isHost = true;

    $gameServer.connect(username, isHost, roomCode);
}

const $gameLobby = new Game_Lobby();
