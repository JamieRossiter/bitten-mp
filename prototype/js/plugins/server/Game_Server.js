/** 
 * @class
 * @description Client-side representation of the server
*/
function Game_Server(){
    this.initialize();
}

/**
 * @private 
 */
Game_Server.prototype.initialize = function(){
    this._socket = null;
    this._isConnected = false;
    this._isError = false;
}

/**
 * @public 
 * @arg {string} username 
 * @arg {boolean} isHost 
 * @arg {string} roomCode 
 * @arg {string} positionData Stringified JSON
 */
Game_Server.prototype.connect = function(username, isHost, roomCode, positionData){
    this._isError = false; // Clear any previous errors on connection attempt
    if(!username){
        // Handle error
        console.error("Username not provided for connection.");
        return;
    }
    const hostStatus = Boolean(isHost);
    this._socket = new WebSocket
        (`ws://192.168.1.26:5000?username=${username}&isHost=${hostStatus}${roomCode ? "&roomCode=" + roomCode : ""}&position=${positionData}`);
    Graphics.startLoading();
    this.listen();
}

/**
 * @public 
 * @arg {number} code 
 */
Game_Server.prototype.disconnect = function(code){
    if(!this._socket){
        // Handle error
    }
    this._socket.close(code);
}

Game_Server.prototype.handleError = function(){
    this._isError = true;
    this._isConnected = false;
}

/**
 * @private
 * @desc Listens to the various WebSocket events
 */
Game_Server.prototype.listen = function(){

    this._socket.addEventListener("open", _ => {
        Graphics.endLoading();
        this._isConnected = true;
        this._isError = false;
    })

    this._socket.addEventListener("close", closeEvent => {
        console.error(closeEvent);
        this._isConnected = false;
    })

    this._socket.addEventListener("error", _ => {
        Graphics.endLoading();
        this.handleError();
    })

    this._socket.addEventListener("message", messageEvent => {
        
        const parsedMessage = JSON.parse(messageEvent.data);
        const serverMessage = { type: parsedMessage.Type, event: parsedMessage.Event, message: JSON.parse(parsedMessage.Message)};
        Util_MessageProcessor.processMessage(serverMessage);

    })
}

/**
 * @public 
 * @arg {string} event The event code to send 
 * @arg {object} message The contents of the message
 * @arg {string} targetPlayer The room code of the target room
 */
Game_Server.prototype.sendMessageToPlayer = function(event, message, targetPlayer){
    const messageObj = { Type: MessageType.Individual, Event: event, Message: message, RoomCode: $gameRoom.code, PlayerId: targetPlayer };
    this._socket.send(JSON.stringify(messageObj));
}

/**
 * @public 
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
     * @instance
     * @memberof Game_Server
     * @member {boolean}
     */
    isConnected: {
        get(){
            return this._isConnected;
        }
    },
    /**
     * @instance
     * @memberof Game_Server
     * @member {boolean}
     */
    isError: {
        get(){
            return this._isError;
        }
    }
})

const $gameServer = new Game_Server();