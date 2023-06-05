import { Npc } from "./Npc";

/** 
 * @class
 * @description Represents an arbitrary channel within the server where I/O for individual game sessions take place.
*/

export class Room {

    private _code: string;
    private _npcs: Npc[];

    constructor(code: string){
        this._code = code;
        this._npcs = [];
    }

    public addNpc(newNpc: Npc): void{
        this._npcs.push(newNpc);
    }

    public getNpcById(id: number): Npc | undefined {
        return this._npcs.find((npc: Npc) => npc.id === id);
    }

    get npcs(): Npc[] {
        return this._npcs;
    }

    get code(): string{
        return this._code;
    }

}
