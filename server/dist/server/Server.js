"use strict";
/**
 * @class
 * @description The WebSockets server that handles all incoming and outgoing requests to all connected clients
 * @author Jamie Rossiter
*/
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class Server {
    constructor(port) {
        this._port = port;
        this._io = this.createServer(port);
        this.printServerMessage();
    }
    createServer(port) {
        return new socket_io_1.Server(port, {
            cors: { origin: "*", methods: ["GET", "POST"] }
        });
    }
    printServerMessage() {
        console.log(`INFECTED MP Server is running on port ${this._port}`);
    }
    get sockets() {
        return this._io.fetchSockets();
    }
}
exports.default = Server;
