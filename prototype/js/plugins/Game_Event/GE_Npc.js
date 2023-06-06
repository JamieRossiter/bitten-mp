/**
 * @namespace Game_Event
 * @description Contains all methods relating to NPC events
 */

/**
 * @external
 * @description Determines if the event is tagged as an NPC event
 */
Game_Event.prototype.isNpc = function(){
    return this.event().note.includes("npc");
}