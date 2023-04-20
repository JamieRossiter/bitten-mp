/**
 * @file extractPlayerInitData.ts
 * @description Functions for extracting player init data from a handshake query
*/

import WebSocket from "ws";
import http from "http";
import { generateRandomFixedInteger, generateRandomAlphanumericalString } from "../utils";
import { PlayerInit } from "../types";

export function extractPlayerInitData(socket: WebSocket.WebSocket, req: http.IncomingMessage) {

    let url: string = "";
    if(req.url) url = req.url;

    const query: object = getQueryFromUrl(url);

    return validatePlayerInitData(query, socket);
}

function getQueryFromUrl(url: string): object {

    let query: any = {};
    const rawParams: string[] = url.split("/?")[1].split("&");

    rawParams.forEach((param: string) => {
        if(param.includes("%20")) param = param.replace(/%20/g, " "); // Check if params include spaces

        const splitParam: string[] = param.split("="); 
        query[splitParam[0]] = splitParam[1];
    });

    return query;

}

function validatePlayerInitData(query: object, socket: WebSocket.WebSocket): PlayerInit {

    const initData: PlayerInit = { 
        socket: socket, 
        id: generateRandomAlphanumericalString(10), 
        username: `User#${generateRandomFixedInteger(6)}`, 
        isHost: false,
        room: "" 
    };
    
    if("username" in query){
        if(query.username) initData.username = query.username.toString();
    }
    if("isHost" in query){
        initData.isHost = (query.isHost === "true"); // convert to boolean
    }
    if("room" in query){
        if(query.room) initData.room = query.room.toString();
    }

    return initData;

}