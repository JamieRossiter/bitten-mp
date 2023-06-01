/**
 * @namespace Game_Event
 */

const rmmz_gameEvent_initialize_alias = Game_Event.prototype.initialize;
/**
 * @external
 */
Game_Event.prototype.initialize = function(mapId, eventId){
    rmmz_gameEvent_initialize_alias.call(this, mapId, eventId);
    /**
     * @private
     * @desc Is the event currently playing in the game, or are they a dummy event
     * @type {boolean}
     */
    this._isPlaying = false;

    /**
     * @private
     * @desc Has event movement been activated by the server 
     * @type {boolean}
     */
    this._isCurrentlyMoving = false;

    /**
     * @private
     * @desc The direction the event should change to once it completes its current step
     * @type {number}
     */
    this._queuedDirection = 0;

    /**
     * @private
     * @desc The coordinates the event should move to once it stops to correct any errors being client/server
     * @type { {x: number, y: number} }
     */
    this._queuedPosition = {x: -1, y: -1};
}

const rmmz_gameEvent_update_alias = Game_Event.prototype.update;
/**
 * @external
 * @memberof Game_Event
 * @desc Handle movement of the event
 */
Game_Event.prototype.update = function(){
    rmmz_gameEvent_update_alias.call(this);

    // Tell the event to move forward again once it has finished its step
    if(this.isPlayer()){

        if(this._isCurrentlyMoving && this.isStopping()){
            this.moveStraight(this._queuedDirection);
        } else if(!this._isCurrentlyMoving && this._stopCount > 1 && (this._queuedPosition.x > -1 || this._queuedPosition.y > -1)){
            const correctionDir = this.findDirectionTo(this._queuedPosition.x, this._queuedPosition.y);
            this.setDirection(correctionDir);
            this.moveStraight(correctionDir);
            if(this.x === this._queuedPosition.x && this.y === this._queuedPosition.y){
                this._queuedPosition = {x: -1, y: -1};
            }
        }

    }
}

Game_Event.prototype.randomisePath = function(){
    this.setPath("updown");
}

/** 
 * @external
 * @description Determines if the event is tagged as a player event
 * @returns {boolean}
*/
Game_Event.prototype.isPlayer = function(){
    return this.event().note.includes("player");
}

/**
 * @external
 * @description Determines if the event is tagged as an NPC event
 */
Game_Event.prototype.isNpc = function(){
    return this.event().note.includes("npc");
}

/**
 * @external
 * @param {number} x 
 * @param {number} y 
 */
Game_Event.prototype.setQueuedPosition = function(x, y){
    this._queuedPosition.x = x;
    this._queuedPosition.y = y;
}

Object.defineProperties(Game_Event.prototype, {
    /**
     * @instance
     * @memberof Game_Event
     * @type {boolean}
     */
    isPlaying: {
        get(){
            return this._isPlaying;
        },
        set(playing){
            this._isPlaying = playing;
        }
    },
    /**
     * @instance
     * @memberof Game_Event
     * @type {boolean}
     */
    isCurrentlyMoving: {
        get(){
            return this._isCurrentlyMoving;
        },
        set(currentlyMoving){
            this._isCurrentlyMoving = currentlyMoving;
        }
    },
    /**
     * @instance
     * @memberof Game_Event
     * @type {number}
     */
    queuedDirection: {
        get(){
            return this._queuedDirection;
        },
        set(direction){
            this._queuedDirection = direction;
        }
    },
    /**
     * @instance
     * @memberof Game_Event
     * @type {{x: number, y: number}}
     */
    queuedPosition: {
        get(){
            return this._queuedPosition;
        }
    }
})