"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
const run = async (socket, io, player, args) => {
    const username = args[0];
    const user = await (0, database_1.databaseReadByUsername)(username);
    if (!user)
        return socket.emit("ERR", "This user doesn't exist!");
    if (user.privilege >= player.privilege)
        return socket.emit("ERR", "Cannot kick a user with the same or higher rank!");
    const userSocket = io.sockets.connected[user.socketID];
    if (!userSocket)
        return socket.emit("ERR", "This user isn't online!");
    userSocket.emit("SYS", "You have been kicked!");
    userSocket.disconnect();
    socket.emit("SYS", `${username} was kicked successfully.`);
};
exports.run = run;
exports.help = {
    name: "kick",
    description: "Kick a user.",
    usages: [
        "/kick username"
    ]
};
