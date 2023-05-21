/** 
 * @class
 * @description Client-side representation of the server
*/
function Game_Server(){
    this.initialize();
}

/**
 * @private @method
 */
Game_Server.prototype.initialize = function(){
    this._socket = null;
    this._isConnected = false;
}

/**
 * @public @method
 * @arg {string} username 
 * @arg {boolean} isHost 
 * @arg {string} roomCode 
 */
Game_Server.prototype.connect = function(username, isHost, roomCode){
    if(!username){
        // Handle error
        console.error("Username not provided for connection.");
        return;
    }
    const hostStatus = Boolean(isHost);
    this._socket = new WebSocket(`ws://192.168.1.37:5000?username=${username}&isHost=${hostStatus}${roomCode ? "&roomCode=" + roomCode : ""}`);
    this.listen();
    this._isConnected = true;
}

/**
 * @public @method
 * @arg {number} code 
 */
Game_Server.prototype.disconnect = function(code){
    if(!this._socket){
        // Handle error
    }
    this._socket.close(code);
}

/**
 * @private @method
 * @desc Listens to the various WebSocket events
 */
Game_Server.prototype.listen = function(){

    this._socket.addEventListener("open", connectEvent => {
    })

    this._socket.addEventListener("close", closeEvent => {
        console.error(closeEvent);
        this._isConnected = false;
    })

    this._socket.addEventListener("error", errorEvent => {
        // Handle connection error here!
        console.error(errorEvent);
        this._isConnected = false;
    })

    this._socket.addEventListener("message", messageEvent => {
        
        const parsedMessage = JSON.parse(messageEvent.data);
        const serverMessage = { type: parsedMessage.Type, event: parsedMessage.Event, message: JSON.parse(parsedMessage.Message)};
        Util_MessageProcessor.processMessage(serverMessage);

    })
}

/**
 * @public @method
 * @arg {string} event The event code to send 
 * @arg {object} message The contents of the message
 * @arg {string} targetPlayer The room code of the target room
 */
Game_Server.prototype.sendMessageToPlayer = function(event, message, targetPlayer){
    const messageObj = { Type: MessageType.Individual, Event: event, Message: message, RoomCode: $gameRoom.code, PlayerId: targetPlayer };
    this._socket.send(JSON.stringify(messageObj));
}

/**
 * @public @method
 * @arg {string} event The event code to send 
 * @arg {object} message The contents of the message
 * @arg {string} targetRoom The room code of the target room
 */
Game_Server.prototype.broadcastMessageToRoom = function(event, message){
    const messageObj = { Type: MessageType.Broadcast, Event: event, Message: message, RoomCode: $gameRoom.code };
    this._socket.send(JSON.stringify(messageObj));
}

Object.defineProperties(Game_Server.prototype, {
    /**
     * @public @property
     * @type {boolean}
     */
    isConnected: {
        get(){
            return this._isConnected;
        }
    }
})

const $gameServer = new Game_Server();