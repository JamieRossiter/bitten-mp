/** 
 * @class
 * @description The WebSockets server that handles all incoming and outgoing requests to all connected clients
*/

import { WebSocketServer } from "ws"; 
import { logServerMessage } from "../utils";

export class Server {

    private _io: WebSocketServer
    private _port: number;

    constructor(port: number){
        this._port = port;
        this._io = this.createServer(port);
        this.printServerMessage();
    }

    private createServer(port: number): WebSocketServer {
        return new WebSocketServer({ port });
    }

    private printServerMessage(): void{
        logServerMessage(`Server is running on port ${this._port}`);
    }

    get io(): WebSocketServer {
        return this._io;
    }

}