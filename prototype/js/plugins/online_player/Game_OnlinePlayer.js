/** 
 * @class
 * @desc A client-side representation of a server player
*/
function Game_OnlinePlayer(){
    this.initialize(...arguments);
}

/**
 * @private 
 * @arg {string} id Online player ID
 * @arg {string} username Online player username
*/
Game_OnlinePlayer.prototype.initialize = function(id, username, isHost){
    /** 
     * @private 
     * @type {string} 
    */
    this._id = id;

    /** 
     * @private 
     * @type {string} 
    */
    this._username = username;

    /**
     * @private
     * @type {boolean}
     */
    this._isHost = isHost;

    /** 
     * @private 
     * @type {Game_Event} 
     * @description The physical event that represents the online player object 
    */
    this._mapEvent = null;

    /**
     * @private
     * @type {Window_ChatBubble}
     */
    this._chatBubbleWindow = null;

    /**
     * @private
     * @type {Window_TypingIndicator}
     */
    this._typingIndicatorWindow = null;

    /**
     * @private
     * @type {string}
     * @desc The role (vampire or hunter) the player assumes
     */
    this._role = null;

    this._npcDisguise = {isDisguised: true, gender: "male", npc: 1};
}

/**
 * @arg {Game_Event} event
*/
Game_OnlinePlayer.prototype.setMapEvent = function(event){
    this._mapEvent = event;
}

/**
 * @desc Creates the username window that follows the player around
*/
Game_OnlinePlayer.prototype.createUsernameWindow = function(){
    this._usernameWindow = new Window_Username(this);
    SceneManager._scene.addChild(this._usernameWindow);
}

/**
 * @desc Creates the username window that follows the player around
*/
Game_OnlinePlayer.prototype.destroyUsernameWindow = function(){
    SceneManager._scene.removeChild(this._usernameWindow);
    this._usernameWindow = null;
}

/**
 * @desc Creates the chat bubble window
 */
Game_OnlinePlayer.prototype.createChatBubbleWindow = function(){
    this._chatBubbleWindow = new Window_ChatBubble(this);
    SceneManager._scene.addChild(this._chatBubbleWindow);
}

/**
 * @desc Creates the typing indicator window
 */
Game_OnlinePlayer.prototype.createTypingIndicatorWindow = function(){
    this._typingIndicatorWindow = new Window_TypingIndicator(this);
    SceneManager._scene.addChild(this._typingIndicatorWindow);
}

/**
 * @desc Destroys the typing indicator window
 */
Game_OnlinePlayer.prototype.destroyTypingIndicatorWindow = function(){
    SceneManager._scene.removeChild(this._typingIndicatorWindow);
}

/**
 * @desc Sets the player's role
 * @param {Role} role 
 */
Game_OnlinePlayer.prototype.setRole = function(role){
    this._role = role;

    switch(this._role){
        case Role.Vampire:
            this.mapEvent.setImage(`npc/walk/$npc_${this._npcDisguise.gender}_${this._npcDisguise.npc}`);
            this.mapEvent.setMoveSpeed(2);
            this.destroyUsernameWindow();
            break;
        case Role.Hunter:
            this.mapEvent.setImage("hunter/walk/$hunter");
            this.mapEvent.setMoveSpeed(4);
            this.createUsernameWindow();
            break;
    }
}

Game_OnlinePlayer.prototype.randomiseNpcDisguise = function(){
    this._npcDisguise.gender = ["male", "female"][Util.getRandomIntWithinRange(0, 1)];
    this._npcDisguise.npc = Util.getRandomIntWithinRange(1, 3);
}

Game_OnlinePlayer.prototype.toggleDisguise = function(){
    
    // Check if has vampire role
    if(!this.isVampire()){
        // Handle error
        return;
    }

    // Toggle disguised
    if(this._npcDisguise.isDisguised) this._npcDisguise.isDisguised = false;
    else this._npcDisguise.isDisguised = true;

    // Set disguise
    this.setDisguise(this._npcDisguise.isDisguised, this._npcDisguise.gender, this._npcDisguise.npc);

    // Broadcast
    $gameRoom.broadcastTogglePlayerDisguise(this._npcDisguise.isDisguised);
}

Game_OnlinePlayer.prototype.isVampire = function(){
    return this._role === Role.Vampire;
}

Game_OnlinePlayer.prototype.isHunter = function(){
    return this._role === Role.Hunter;
}

Game_OnlinePlayer.prototype.setDisguise = function(isDisguised, gender, npc){
    this._npcDisguise.isDisguised = isDisguised;
    this._npcDisguise.gender = gender;
    this._npcDisguise.npc = npc;

    // Set image based on diguised status
    if(this._npcDisguise.isDisguised){
        this.mapEvent.setImage(`npc/walk/$npc_${this._npcDisguise.gender}_${this._npcDisguise.npc}`);
        this.mapEvent.setMoveSpeed(2);
    } else {
        this.mapEvent.setImage(`vampire/walk/$vampire_${this._npcDisguise.gender}`);
        this.mapEvent.setMoveSpeed(4);
    }
}

Object.defineProperties(Game_OnlinePlayer.prototype, {
    /** 
     * @instance
     * @memberof Game_OnlinePlayer
     * @member {string} 
    */
    id: {
        get: function(){
            return this._id;
        }   
    },

    /** 
     * @instance
     * @memberof Game_OnlinePlayer
     * @member {string}
    */
    username: {
        get: function(){
            return this._username;
        }
    },

    /** 
     * @instance
     * @memberof Game_OnlinePlayer
     * @member {Game_Event} 
    */
    mapEvent: {
        get: function(){
            return this._mapEvent;
        }
    },

    /**
     * @instance
     * @memberof Game_OnlinePlayer
     * @type {Window_ChatBubble}
     */
    chatBubbleWindow: {
        get(){
            return this._chatBubbleWindow;
        }
    },

    /** 
     * @instance
     * @memberof Game_OnlinePlayer
     * @type {Window_TypingIndicator}
     */
    typingIndicatorWindow: {
        get(){
            return this._typingIndicatorWindow;
        }
    },

    /**
     * @instance
     * @memberof Game_OnlinePlayer;
     * @type {string}
     */
    role: {
        get(){
            return this._role;
        }
    },

    /**
     * @instance
     * @memberof Game_OnlinePlayer
     * @type {string}
     */
    isHost: {
        get(){
            return this._isHost;
        }
    },

    npcDisguise: {
        get(){
            return this._npcDisguise;
        }
    },

    isDisguised: {
        get(){
            return this._npcDisguise.isDisguised;
        }
    }
})