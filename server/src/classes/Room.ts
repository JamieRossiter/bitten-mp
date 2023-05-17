/** 
 * @class
 * @description Represents an arbitrary channel within the server where I/O for individual game sessions take place.
*/

export class Room {

    private _code: string;

    constructor(code: string){
        this._code = code;
    }

    get code(): string{
        return this._code;
    }

}
