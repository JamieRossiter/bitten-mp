/**
 * @namespace Game_Room 
 */

/** 
 * @class
 * @description Client-side representation of a server room. 
 * A subset of the server that holds a group of common players together.
*/
function Game_Room(){
    this.initialize();
}

/**
 * @private 
 */
Game_Room.prototype.initialize = function(){
    /**
     * @private 
     * @type {string}
     */
    this._code = "";

    /**
     * @private 
     * @type {Set<Game_OnlinePlayer>}
     */
    this._players = new Set();

    /**
     * @private 
     * @type {Game_OnlinePlayer}
     * @desc This game instance's controlling player
     */
    this._currentPlayer = null;

    /**
     * @private
     * @type {{player: Game_OnlinePlayer, message: string}[]}
     */
    this._chatMessageLog = [];
}

/**
 * @arg {Game_OnlinePlayer} player 
 */
Game_Room.prototype.addPlayer = function(player){
    this._players.add(player);
}

/**
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
 * @arg {string} id 
 * @returns {Game_Player}
 */
Game_Room.prototype.findPlayerById = function(id){
    const playerArr = Array.from(this._players);
    const targetPlayer = playerArr.find(player => player.id === id);
    return targetPlayer;
}

/**
 * @param {Game_OnlinePlayer} player 
 * @param {string} chatMessage 
 */
Game_Room.prototype.addMessageToLog = function(player, chatMessage){
    let messageToLog = "";
    let isWrapped = false;
    const playerUsernameWidth = $gameChat.chatLogWindow.textWidth(player.username + ": ");
    const tokens = chatMessage.split(" ");    

    tokens.forEach(word => {
        const currentWordWidth = $gameChat.chatLogWindow.textWidth(word + " ");
        const currentMessageWidth = $gameChat.chatLogWindow.textWidth(messageToLog); // Get message width)

        if (((currentMessageWidth + playerUsernameWidth + currentWordWidth) + 25) >= $gameChat.chatLogWindow.width) {           
            if(isWrapped){
                this._chatMessageLog.push({message: messageToLog.trim()});
            } else {
                this._chatMessageLog.push({player: player, message: messageToLog.trim()});
            }
            messageToLog = "";
            isWrapped = true;
        } 
        
        messageToLog += word + " ";
    })

    if(isWrapped){
        this._chatMessageLog.push({message: messageToLog.trim()});
        isWrapped = false;
        return;
    }

    this._chatMessageLog.push({player: player, message: messageToLog.trim()});
    
}

/**
 * @returns {Game_OnlinePlayer}
 */
Game_Room.prototype.getHost = function(){
    return Array.from(this._players).find(player => player.isHost);
}

/**
 * @arg {string} code 
 */
Game_Room.prototype.setCode = function(code){
    this._code = code;
}

/**
 * @arg {Game_OnlinePlayer} player 
 */
Game_Room.prototype.setCurrentPlayer = function(player){
    this._currentPlayer = player;
}

Game_Room.prototype.getNpcById = function(npcId){
    return this.getNpcs().find(npc => npc.eventId() === npcId);
}

Game_Room.prototype.getNpcs = function(){
    return $gameMap.events().filter(ev => ev.event().note.includes("npc"));
}

/**
 * @arg {Game_Event} mapEvent
 * @arg {Game_OnlinePlayer} onlinePlayer
 */
Game_Room.prototype.joinGame = function(mapEvent, onlinePlayer){
    onlinePlayer.setMapEvent(mapEvent);   
    onlinePlayer.createUsernameWindow();
    onlinePlayer.createChatBubbleWindow();
    onlinePlayer.createTypingIndicatorWindow();
    onlinePlayer.mapEvent.setTransparent(false);
    onlinePlayer.mapEvent.setPattern(2);
    $gameRoom.addPlayer(onlinePlayer);
    onlinePlayer.mapEvent.isPlaying = true;
}

/**
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
     * @instance
     * @memberof Game_Room
     * @type {string}
     */
    code: {
        get(){
            return this._code;
        }
    },

    /**
     * @instance
     * @memberof Game_Room
     * @type {Game_OnlinePlayer}
     */
    currentPlayer: {
        get(){
            return this._currentPlayer;
        }
    },

    /**
     * @instance
     * @memberof Game_Room
     * @type {{playerUsername: string, chatMessage: string[]}}
     */
    chatMessageLog: {
        get(){
            return this._chatMessageLog;
        }
    },

    /**
     * @instance
     * @memberof Game_Room
     * @type {Set<Game_OnlinePlayer>}
     */
    players: {
        get(){
            return this._players;
        }
    }
})

const $gameRoom = new Game_Room();