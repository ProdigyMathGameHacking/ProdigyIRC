"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
const run = async (socket, _io, player, args) => {
    const username = args[0];
    const newPrivilege = +args[1];
    const user = await (0, database_1.databaseReadByUsername)(username);
    if (!user)
        return socket.emit("ERR", "This user doesn't exist!");
    if (user.privilege >= player.privilege)
        return socket.emit("ERR", "Cannot change the role of a user with the same or higher rank!");
    user.privilege = Math.min(Math.max(newPrivilege, 0), 3);
    (0, database_1.databaseUpdateByUsername)(user, username);
    socket.emit("SYS", `${username}'s role was updated to ${newPrivilege} successfully!`);
};
exports.run = run;
exports.help = {
    name: "role",
    description: "Change the role of a user.",
    usages: [
        "/role username [0-3]"
    ]
};
