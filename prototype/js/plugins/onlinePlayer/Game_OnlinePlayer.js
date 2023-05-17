/** 
 * @class
 * @description A client-side representation of a server player
*/
function Game_OnlinePlayer(){
    this.initialize(...arguments);
}

Game_OnlinePlayer.prototype.initialize = function(id, username){
    this._id = id;
    this._username = username;
    this._mapEvent = null;
}

Game_OnlinePlayer.prototype.setMapEvent = function(event){
    this._mapEvent = event;
}

Game_OnlinePlayer.prototype.createUsernameWindow = function(){
    this._usernameWindow = new Window_Username(this);
    SceneManager._scene.addChild(this._usernameWindow);
}

Game_OnlinePlayer.prototype.destroyUsernameWindow = function(){
    SceneManager._scene.removeChild(this._usernameWindow);
    this._usernameWindow = null;
}

Object.defineProperty(Game_OnlinePlayer.prototype, "id", {
    get: function(){
        return this._id;
    }
})

Object.defineProperty(Game_OnlinePlayer.prototype, "username", {
    get: function(){
        return this._username;
    }
})

Object.defineProperty(Game_OnlinePlayer.prototype, "mapEvent", {
    get: function(){
        return this._mapEvent;
    }
})