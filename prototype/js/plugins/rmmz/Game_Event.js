const rmmz_gameEvent_initialize_alias = Game_Event.prototype.initialize;
/**
 * @external
 */
Game_Event.prototype.initialize = function(mapId, eventId){
    rmmz_gameEvent_initialize_alias.call(this, mapId, eventId);
    this._isPlaying = false;
    this._isCurrentlyMoving = false;
    this._queuedDirection = 0;
    this._queuedPosition = {x: -1, y: -1};
}

const rmmz_gameEvent_update_alias = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
    rmmz_gameEvent_update_alias.call(this);

    // Tell the event to move forward again once it has finished its step
    if(this._isCurrentlyMoving && this.isStopping()){
        this.moveStraight(this._queuedDirection);
    } else if(!this._isCurrentlyMoving && this._stopCount > 1 && (this._queuedPosition.x > -1 || this._queuedPosition.y > -1)){
        const correctionDir = this.findDirectionTo(this._queuedPosition.x, this._queuedPosition.y);
        this.setDirection(correctionDir);
        this.moveStraight(correctionDir);
        this._queuedPosition = {x: -1, y: -1};
    }
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
    },
    isCurrentlyMoving: {
        get(){
            return this._isCurrentlyMoving;
        },
        set(currentlyMoving){
            this._isCurrentlyMoving = currentlyMoving;
        }
    },
    queuedDirection: {
        get(){
            return this._queuedDirection;
        },
        set(direction){
            this._queuedDirection = direction;
        }
    }
})