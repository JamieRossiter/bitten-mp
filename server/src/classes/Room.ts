/** 
 * @class
 * @description Represents an arbitrary channel within the server where I/O for individual game sessions take place.
*/

import { MessageEventCode } from "../enums";
import Player from "./Player";

class Room {

    private _code: string;
    private _maxPlayers: number;

    constructor(code: string, maxPlayers: number){
        this._code = code;
        this._maxPlayers = maxPlayers;
    }

    get code(): string{
        return this._code;
    }

}

export default Room;