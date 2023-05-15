/** 
 * @external
 * @description Aliases the Game_Player initialize method and adds the online player member
*/
const onlinePlayer_gamePlayer_initialize_alias = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function(){
    onlinePlayer_gamePlayer_initialize_alias.call(this);
    /** 
     * @private @field
     * @type Game_OnlinePlayer 
     * */
    this._onlinePlayer = null;
}

/** 
 * @external
 * @public @method
 * @description Attaches a Game_OnlinePlayer instance to Game_Player object
 * @argument {Game_OnlinePlayer} onlinePlayer
*/
Game_Player.prototype.setOnlinePlayer = function(onlinePlayer){
    this._onlinePlayer = onlinePlayer;
}

/** 
 * @external
 * @public @property
 * @description Returns Game_OnlinePlayer instance attached to Game_Player
 * @returns {Game_OnlinePlayer}
 */
Object.defineProperty(Game_Player.prototype, "onlinePlayer", { 
    get: function(){
        return this._onlinePlayer;
    }
})