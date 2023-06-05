export class Npc {

    private _eventId: number;
    private _path: string;
    private _state: string;

    constructor(id: number, path: string){
        this._eventId = id;
        this._path = path; 
        this._state = "";
    }

    public setState(targetState: string){
        this._state = targetState;
    }

    get path(): string {
        return this._path;
    }

    get id(): number {
        return this._eventId;
    }

    get state(): string {
        return this._state;
    }

}