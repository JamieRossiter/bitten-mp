/** 
 * @class
 * @desc A client-side representation of a server player
*/
function Game_OnlinePlayer(){
    this.initialize(...arguments);
}

/**
 * @private @method
 * @arg {string} id Online player ID
 * @arg {string} username Online player username
*/
Game_OnlinePlayer.prototype.initialize = function(id, username){
    /** 
     * @private @field 
     * @type {string} 
    */
    this._id = id;

    /** 
     * @private @field 
     * @type {string} 
    */
    this._username = username;

    /** 
     * @private @field 
     * @type {Game_Event} 
     * @description The physical event that represents the online player object 
     * */
    this._mapEvent = null;
}

/**
 * @public @method
 * @arg {Game_Event} event
*/
Game_OnlinePlayer.prototype.setMapEvent = function(event){
    this._mapEvent = event;
}

/**
 * @public @method
 * @desc Creates the username window that follows the player around
*/
Game_OnlinePlayer.prototype.createUsernameWindow = function(){
    this._usernameWindow = new Window_Username(this);
    SceneManager._scene.addChild(this._usernameWindow);
}

/**
 * @public @method
 * @desc Creates the username window that follows the player around
*/
Game_OnlinePlayer.prototype.destroyUsernameWindow = function(){
    SceneManager._scene.removeChild(this._usernameWindow);
    this._usernameWindow = null;
}

Object.defineProperties(Game_OnlinePlayer.prototype, {
    /** 
     * @public @property 
     * @type {string} 
    */
    id: {
        get: function(){
            return this._id;
        }   
    },

    /** 
     * @public @property 
     * @type {string} 
    */
    username: {
        get: function(){
            return this._username;
        }
    },

    /** 
     * @public @property 
     * @type {Game_Event} 
    */
    mapEvent: {
        get: function(){
            return this._mapEvent;
        }
    }
})