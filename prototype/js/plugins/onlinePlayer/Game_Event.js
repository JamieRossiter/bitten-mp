/** 
 * @external
 * @public @method
 * @description Determines if the event is tagged as a player event
 * @returns {boolean}
*/
Game_Event.prototype.isPlayer = function(){
    return this.event().note.includes("player");
}