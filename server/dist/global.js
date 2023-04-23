"use strict";
/**
 * @file global.ts
 * @description Global objects
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Server = void 0;
const Server_1 = __importDefault(require("./classes/Server"));
exports.$Server = new Server_1.default(3000);