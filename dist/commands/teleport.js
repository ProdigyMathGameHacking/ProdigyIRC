"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
const run = async (socket, io, _player, args) => {
    const username = args[0];
    const user = await (0, database_1.databaseReadByUsername)(username);
    const userSocket = io.sockets.connected[user.socketID];
    userSocket.emit("REQ_LOC");
    userSocket.once("RES_LOC", loc => {
        socket.emit("LOC", loc);
    });
};
exports.run = run;
exports.help = {
    name: "tp",
    description: "Teleport to a player.",
    usages: [
        "/tp username",
        "/tp teleporter teleportee"
    ]
};
