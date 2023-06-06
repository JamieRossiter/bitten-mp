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

    // Handle player interaction
    this.handleInteraction();
}

/**
 * @external
 * @override
 * @returns {number}
 */
Game_Event.prototype.isNearThePlayer = function() {
    const sx = Math.abs(this.deltaXFrom($gamePlayer.x));
    const sy = Math.abs(this.deltaYFrom($gamePlayer.y));
    return sx + sy < 3;
};

Game_Event.prototype.handleInteraction = function(){
    
    const currentPlayer = $gameRoom.currentPlayer;

    if(
        this.isNearThePlayer() // Event is within 3 tiles of the player
        && Input.isTriggered("ok") // Player pressed prompt
    ){

        // If NPC
        if(this.isNpc()){
            if(this.getCurrentState() === "down") return; // If the event is already downed, don't continue processing

            switch(currentPlayer.role){
                case Role.Vampire:
    
                    if(currentPlayer.isDisguised) return;
                    currentPlayer.darkFormFrames = currentPlayer.darkFormMaxFrames;
                    // Kill NPC and extract blood points
    
                break;
                case Role.Hunter:
        
                    // Kill NPC, arrest hunter for killing an innocent

                break
            }
    
            this.setState("down"); 
        }

        // If Player
        if(this.isPlayer()){

            const targetPlayer = $gameRoom.getPlayerByMapEvent(this);
            if(!targetPlayer){
                // Handle error
                return;
            }

            switch(currentPlayer.role){
                case Role.Vampire:

                    if(targetPlayer.role === Role.Hunter){
                        $gameRoom.assignRole(Role.Vampire, targetPlayer);
                        console.log("Turn into vampire");
                    }
                    // Turn event player into vampire

                break;

                case Role.Hunter:

                    if(targetPlayer.role === Role.Vampire){
                        targetPlayer.kill();
                        $gameRoom.broadcastPlayerDeath(targetPlayer);
                    }
                    // Kill event player if the player is a vampire

                break;
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