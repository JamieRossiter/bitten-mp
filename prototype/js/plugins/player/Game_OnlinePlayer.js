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