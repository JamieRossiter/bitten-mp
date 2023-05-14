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

Game_OnlinePlayer.prototype.id = function(){
    return this._id;
}

/** 
 * @external
 * @description Aliases the Game_Player initialize method and adds the online player member
*/
const gameOnlinePlayer_gamePlayer_initialize_alias = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function(){
    gameOnlinePlayer_gamePlayer_initialize_alias.call(this);
    /** 
     * @private @field
     * @type Game_OnlinePlayer 
     * */
    this._onlineData = null;
}

/** 
 * @public @method
 * @description Attaches a Game_OnlinePlayer instance to Game_Player object
 * @argument {Game_OnlinePlayer} onlineData
*/
Game_Player.prototype.setOnlineData = function(onlineData){
    this._onlineData = onlineData;
}

/** 
 * @public @property
 * @description Returns Game_OnlinePlayer instance attached to Game_Player
 * @returns {Game_OnlinePlayer}
 */
Game_OnlinePlayer.prototype.onlineData = function(){
    return this._onlineData;
}