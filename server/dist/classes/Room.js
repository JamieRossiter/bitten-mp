"use strict";
/**
 * @class
 * @description Represents an arbitrary channel within the server where I/O for individual game sessions take place.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(code, maxPlayers) {
        this._code = code;
        this._maxPlayers = maxPlayers;
    }
    get code() {
        return this._code;
    }
}
exports.default = Room;
