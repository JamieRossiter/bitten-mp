export class Npc {

    private _eventId: number;
    private _path: string;

    constructor(id: number, path: string){
        this._eventId = id;
        this._path = path; 
    }

    get path(): string {
        return this._path;
    }

    get id(): number {
        return this._eventId;
    }

}