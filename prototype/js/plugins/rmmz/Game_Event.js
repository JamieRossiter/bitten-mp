const rmmz_gameEvent_initialize_alias = Game_Event.prototype.initialize;
/**
 * @external
 */
Game_Event.prototype.initialize = function(mapId, eventId){
    rmmz_gameEvent_initialize_alias.call(this, mapId, eventId);
    this._isPlaying = false;
}

/** 
 * @external
 * @description Determines if the event is tagged as a player event
 * @returns {boolean}
*/
Game_Event.prototype.isPlayer = function(){
    return this.event().note.includes("player");
}

Game_Event.prototype.isNpc = function(){
    return this.event().note.includes("npc");
}

Object.defineProperties(Game_Event.prototype, {
    isPlaying: {
        get(){
            return this._isPlaying;
        },
        set(playing){
            this._isPlaying = playing;
        }
    }
})