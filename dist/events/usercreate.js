"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Player_1 = require("../types/Player");
const database_1 = require("../utils/database");
const handler = async (socket, _io) => {
    return new Promise(async (res, rej) => {
        const token = await generateToken(32);
        socket.emit("REQ_USERNAME");
        socket.once("RES_USERNAME", async (username, ign) => {
            if (await (0, database_1.databaseReadByUsername)(username)) {
                socket.emit("ERR", "Username taken!");
                rej(new Error("Username taken!"));
            }
            else if (!/^([a-z0-9]{2,16})$/i.test(username)) {
                socket.emit("ERR", "Username must be an alphanumeric string between 2 and 16 characters!");
                rej(new Error("Username must be an alphanumeric string between 2 and 16 characters!"));
            }
            else {
                (0, database_1.databaseWrite)(new Player_1.Player(username, token, socket.id, ign, 1));
                res(token);
            }
            return rej(new Error("Done."));
        });
        async function generateToken(n) {
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let token = "";
            for (let i = 0; i < n; i++) {
                token += chars[Math.floor(Math.random() * chars.length)];
            }
            return await (0, database_1.databaseReadByToken)(token) ? generateToken(n) : token;
        }
    });
};
exports.handler = handler;
//# sourceMappingURL=usercreate.js.map