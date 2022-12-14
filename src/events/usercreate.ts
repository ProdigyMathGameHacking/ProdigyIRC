import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseReadByToken, databaseWrite } from "../utils/database";

export const handler = async (socket: Socket, _io: Server) => {
    return new Promise(async (res, rej) => {
        const token = await generateToken(32);
        socket.emit("REQ_USERNAME");
        socket.once("RES_USERNAME", async (username, ign) => {
            // Check if username already exists
            if (await databaseReadByUsername(username)) {
                socket.emit("ERR", "Username taken!");
                rej(new Error("Username taken!"));
            } else if (!/^([a-z0-9]{2,16})$/i.test(username)) {
                socket.emit("ERR", "Username must be an alphanumeric string between 2 and 16 characters!");
                rej(new Error("Username must be an alphanumeric string between 2 and 16 characters!"));
            } else {
                // Create username
                databaseWrite(new Player(username, token, socket.id, ign, 1));
                res(token);
            }

            return rej(new Error("Done."));
        })

        async function generateToken(n: number): Promise<string> {
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let token = "";
            for (let i = 0; i < n; i++) {
                token += chars[Math.floor(Math.random() * chars.length)];
            }

            return await databaseReadByToken(token) ? generateToken(n) : token;
        }
    })
}