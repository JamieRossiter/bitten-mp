/** 
 * @class
 * @description Represents the manager of a player roster/ledger
*/

import { Player } from "./";

export class PlayerManager {

    private _players: Set<Player>;

    constructor(){
        this._players = new Set();
    }

    public addPlayer(player: Player): void {
        this._players.add(player);
    }

    public removePlayer(player: Player): void {
        this._players.delete(player);
    }

    public getPlayerById(playerId: string): Player | undefined {
        return Array.from(this._players).find((player: Player) => player.id === playerId);
    }

    get players(): Player[]{
        return Array.from(this._players);
    }

}