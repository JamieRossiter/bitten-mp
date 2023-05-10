function Game_OnlinePlayer(){
    this.initialize(...arguments);
}

Game_OnlinePlayer.prototype.initialize = function(id, username){
    this._id = id;
    this._username = username;
}

