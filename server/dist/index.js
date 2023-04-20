"use strict";
/**
 * @file index.ts
 * @author Jamie Rossiter
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./classes/Player"));
const Server_1 = __importDefault(require("./classes/Server"));
const helpers_1 = require("./helpers");
const server = new Server_1.default(3000);
/* Connection listener */
server.io.on("connection", (socket, req) => {
    // Create current player
    const playerInit = (0, helpers_1.extractPlayerInitData)(socket, req);
    const player = new Player_1.default(playerInit);
    // Handle connection
    (0, helpers_1.handleServerConnection)(server, player);
    (0, helpers_1.handleRoomAssignment)(server, playerInit.room, player);
    // Handle disconnection
    socket.on("close", (closeCode) => {
        (0, helpers_1.handleServerDisconnection)(server, player, closeCode);
        (0, helpers_1.handleRoomDeassignment)(server, player);
    });
});
