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
Game_OnlinePlayer.prototype.initialize = function(id, username){
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
     * @type {Game_Event} 
     * @description The physical event that represents the online player object 
     * */
    this._mapEvent = null;
    this._chatBubbleWindow = null;
    this._typingIndicatorWindow = null;
    this._role = null;
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

Game_OnlinePlayer.prototype.createChatBubbleWindow = function(){
    this._chatBubbleWindow = new Window_ChatBubble(this);
    SceneManager._scene.addChild(this._chatBubbleWindow);
}

Game_OnlinePlayer.prototype.createTypingIndicatorWindow = function(){
    this._typingIndicatorWindow = new Window_TypingIndicator(this);
    SceneManager._scene.addChild(this._typingIndicatorWindow);
}

Game_OnlinePlayer.prototype.destroyTypingIndicatorWindow = function(){
    SceneManager._scene.removeChild(this._typingIndicatorWindow);
}

Game_OnlinePlayer.prototype.setRole = function(role){
    this._role = role;

    switch(this._role){
        case Role.Vampire:
            this.mapEvent.setImage("npc4", 3);
            this.destroyUsernameWindow();
            break;
        case Role.Hunter:
            break;
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

    chatBubbleWindow: {
        get(){
            return this._chatBubbleWindow;
        }
    },

    typingIndicatorWindow: {
        get(){
            return this._typingIndicatorWindow;
        }
    },

    role: {
        get(){
            return this._role;
        }
    }
})