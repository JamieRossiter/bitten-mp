/**
 * @file  utils.ts
 * @description Utility functions
*/

export function logServerMessage(message: string, data?: any): void {
    if(data){
        console.log(`[Infection MP] ${message}`, data);
        return;
    }
    console.log(`[Infection MP] ${message}`);
}

export function generateRandomFixedInteger(length: number) : number {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

export function generateRandomAlphanumericalString(length: number) : string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

export function generateRandomAlphabeticalString(length: number, letterCase: string): string {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var result  = "";
    for (var i = 0; i < length; ++i) {
        result += alphabet[Math.floor(alphabet.length * Math.random())];
    }

    if(letterCase === "uppercase") result = result.toUpperCase();
    else if(letterCase === "lowercase") result = result.toLowerCase();
    else result = result;
    
    return result;
}