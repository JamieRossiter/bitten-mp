/** 
 * @external
 * @description Aliases the Game_Event initialize method and adds the online player member
*/
const onlinePlayer_gameEvent_initialize_alias = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId){
    onlinePlayer_gameEvent_initialize_alias.call(this, mapId, eventId);
    /** 
     * @private @field
     * @type {Game_OnlinePlayer} 
     * */
    this._onlinePlayer = null;
}

const onlinePlayer_gameEvent_update_alias = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
    onlinePlayer_gameEvent_update_alias.call(this);
    if(this.isPlayer() && !this.isTransparent() && !this.onlinePlayer) this.setTransparent(true);
}

/** 
 * @external
 * @public @method
 * @description Attaches a Game_OnlinePlayer instance to Game_Event object
 * @argument {Game_OnlinePlayer} onlinePlayer
*/
Game_Event.prototype.setOnlinePlayer = function(onlinePlayer){
    this._onlinePlayer = onlinePlayer;
}

/** 
 * @external
 * @public @method
 * @description Determines if the event is tagged as a player event
 * @returns {boolean}
*/
Game_Event.prototype.isPlayer = function(){
    return this.event().note.includes("player");
}

/** 
 * @external
 * @public @property
 * @description Returns Game_OnlinePlayer instance attached to Game_Event
 * @returns {Game_OnlinePlayer}
 */
Object.defineProperty(Game_Event.prototype, "onlinePlayer", { 
    get: function(){
        return this._onlinePlayer;
    }
})