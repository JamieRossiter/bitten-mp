/**
 * @class
 */
function Game_Chat(){
    this.initialize(...arguments);
}

/**
 * @private
 */
Game_Chat.prototype.initialize = function(){
    this.initMembers();
}

/**
 * @private
 */
Game_Chat.prototype.initMembers = function(){
    /**
     * @private
     * @type {boolean}
     */
    this._isActive = false;

    /**
     * @private
     * @type {string}
     */
    this._currentInput = "";

    /**
     * @private
     * @type {string}
     */
    this._scrolledInput = "";

    /**
     * @private
     * @type {boolean}
     */
    this._isInputting = false;

    /**
     * @private
     * @type {boolean}
     */
    this._isTyping = false;

    /**
     * @private
     * @type {Window_ChatInput}
     */
    this._chatInputWindow = null;

    /**
     * @private
     * @type {Window_ChatLog}
     */
    this._chatLogWindow = null;

    /**
     * @private 
     * @constant
     * @type {number}
     */
    this._maxInputCharacters = 60; 

    /**
     * @private
     * @constant
     * @type {number}
     */
    this._maxCharacters = 120;

    /**
     * @private
     * @type {Function}
     */
    this._keyInputListener = this.keyboardInputListener.bind(this);

    /**
     * @private
     * @type {Function}
     */
    this._keyReleaseListener = this.keyboardReleaseListener.bind(this);
    
    /**
     * @private
     * @type {string}
     */
    this._totalInput = "";
}

/**
 * @private
 * @desc Listen to keyboard input from the player
 */
Game_Chat.prototype.keyboardInputListener = function(keyEvent){
    const key = keyEvent.key;
    this._totalInput = this._scrolledInput + this._currentInput;
    
    // Handle input press
    if(this.isKeySpace(key) && (this._totalInput.length <= this._maxCharacters)){

        this.handleSpacePressed();

    } else if(this.isKeyBackspace(key)){
        
        this.handleBackspacePressed();

    } else if(this.isKeyEnter(key)){
        
        this.handleEnterPressed();

    } else if(this.isKeyValid(key) && ((this._totalInput.length) <= this._maxCharacters)){
        
        this.handleValidKeyPressed(key);

    } else return;

    this.handleTextScroll();

    this._isInputting = true;
}

/**
 * @private
 * @desc Listens to keyboard release from the player
 */
Game_Chat.prototype.keyboardReleaseListener = function(_){
    this._isInputting = false;
}

/**
 * @private
 * @param {string} key 
 * @returns {boolean}
 */
Game_Chat.prototype.isKeyValid = function(key){
    const validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?.,"@#$%^&*()_+-=:\'\\<>/\\~`{}|[]';
    return validKeys.split("").includes(key);
}

/**
 * @private
 * @param {string} key 
 * @returns {boolean}
 */
Game_Chat.prototype.isKeyBackspace = function(key){
    return key === "Backspace";
}

/**
 * @private
 * @param {string} key 
 * @returns {boolean}
 */
Game_Chat.prototype.isKeySpace = function(key){
    return key === " ";
}

/**
 * @private
 * @param {string} key 
 * @returns {boolean}
 */
Game_Chat.prototype.isKeyEnter = function(key){
    return key === "Enter";
}

/**
 * @private
 * @desc Handles logic when user presses the backspace key
 */
Game_Chat.prototype.handleBackspacePressed = function(){
    // Handle text scroll
    if(this._scrolledInput.length > 0){
        this._currentInput = this._scrolledInput[this._scrolledInput.length - 1] + this._currentInput;
        this._scrolledInput = this._scrolledInput.slice(0, -1);
    }
    // If the player removes all text from input, deactivate typing indicator window
    if(this._totalInput.length <= 1){
        $gameRoom.broadcastPlayerIsTyping(false);
        this.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
        this._isTyping = false;
    }
    this._currentInput = this._currentInput.slice(0, -1);
}

/**
 * @private
 * @desc Handles logic when user presses a valid alphanumeric or special key
 */
Game_Chat.prototype.handleValidKeyPressed = function(key){

    this._currentInput += key;

    // If the player has started typing and their chat bubble window is not active, activate the typing indicator window
    if(!this._isTyping && !$gameRoom.currentPlayer.chatBubbleWindow.isActive){
        $gameChat.activatePlayerTypingIndicator($gameRoom.currentPlayer);
        $gameRoom.broadcastPlayerIsTyping(true);
        this._isTyping = true;
    }      
    
}

/**
 * @private
 * @desc Handles logic when user presses the space key
 */
Game_Chat.prototype.handleSpacePressed = function(){
    this._currentInput += " ";
}

/**
 * @private
 * @desc Handles logic when user presses the enter key
 */
Game_Chat.prototype.handleEnterPressed = function(){

    if(!this._totalInput.trim()) return; 

    this.activatePlayerChatBubble($gameRoom.currentPlayer, this._totalInput.trim());
    $gameRoom.addMessageToLog($gameRoom.currentPlayer, this._totalInput.trim());
    $gameRoom.broadcastPlayerIsTyping(false);
    this.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
    this._isTyping = false;

    $gameRoom.broadcastChatMessage(this._totalInput.trim());
    this._currentInput = "";
    this._scrolledInput = "";

}

/**
 * @private
 * @desc Handles the scrolling of text once text has reached the end of the window
 */
Game_Chat.prototype.handleTextScroll = function(){

    if(this._currentInput.length >= this._maxInputCharacters){
        this._scrolledInput += this._currentInput[this._maxInputCharacters - this._currentInput.length];
        this._currentInput = this._currentInput.substring(1);    
    }

}

/**
 * @desc Activates the game chat
 */
Game_Chat.prototype.activate = function(){
    this._isActive = true;
    if(!this._chatInputWindow) this._chatInputWindow = new Window_ChatInput();
    if(!this._chatLogWindow) this._chatLogWindow = new Window_ChatLog();
    SceneManager._scene.addChild(this._chatInputWindow);
    SceneManager._scene.addChild(this._chatLogWindow);
    window.addEventListener("keydown", this._keyInputListener);
    window.addEventListener("keyup", this._keyReleaseListener); 
}

/**
 * @desc Deactivates the game chat
 */
Game_Chat.prototype.deactivate = function(){
    this._isActive = false;
    this._currentInput = "";
    this._isInputting = false;
    SceneManager._scene.removeChild(this._chatInputWindow);
    SceneManager._scene.removeChild(this._chatLogWindow);
    window.removeEventListener("keydown", this._keyInputListener);
    window.removeEventListener("keyup", this._keyReleaseListener);
}

/**
 * @param {Game_OnlinePlayer} player 
 * @param {string} message 
 */
Game_Chat.prototype.activatePlayerChatBubble = function(player, message){
    player.chatBubbleWindow.drawChatMessage(message);
    player.chatBubbleWindow.activate();
}

/**
 * @param {Game_OnlinePlayer} player 
 */
Game_Chat.prototype.activatePlayerTypingIndicator = function(player){
    player.typingIndicatorWindow.activate();
}

/**
 * @param {Game_OnlinePlayer} player 
 */
Game_Chat.prototype.deactivatePlayerTypingIndicator = function(player){
    player.typingIndicatorWindow.deactivate();
}

Object.defineProperties(Game_Chat.prototype, {
    /**
     * @instance
     * @type {string}
     */
    currentInput: {
        get(){
            return this._currentInput;
        }
    },
    /**
     * @instance
     * @type {boolean}
     */
    isInputting: {
        get(){
            return this._isInputting;
        }
    },
    /**
     * @instance
     * @type {boolean}
     */
    isActive: {
        get(){
            return this._isActive;
        }
    },
    /**
     * @instance
     * @type {boolean}
     */
    isTyping: {
        get(){
            return this._isTyping;
        },
        set(typing){
            this._isTyping = typing;
        }
    },
    /**
     * @instance
     * @type {Window_ChatInput}
     */
    chatInputWindow: {
        get(){
            return this._chatInputWindow;
        }
    },
    /**
     * @instance
     * @type {Window_ChatLog}
     */
    chatLogWindow: {
        get(){
            return this._chatLogWindow;
        }
    }
})

const $gameChat = new Game_Chat();

const gameChat_sceneMap_update_alias = Scene_Map.prototype.update;
/**
 * @external
 * @memberof Scene_Map
 * @desc Checks to see if the chat button is triggered
 */
Scene_Map.prototype.update = function(){
    gameChat_sceneMap_update_alias.call(this);

    if(!$gameServer.isConnected) return;

    if(Input.isTriggered("chat") && !$gameChat.isActive){
        $gameChat.activate();
    } else if (Input.isTriggered("escape") && $gameChat.isActive){
        $gameChat.deactivate();
        $gameChat.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
        $gameRoom.broadcastPlayerIsTyping(false);
        $gameChat.isTyping = false;
    }
}