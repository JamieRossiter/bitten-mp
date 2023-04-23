/** 
 * @class
 * @description Represents an arbitrary channel within the server where I/O for individual game sessions take place.
*/

export class Room {

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
