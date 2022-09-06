"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const database_js_1 = require("../utils/database.js");
const command_js_1 = require("./command.js");
const handler = async (socket, io, commands, token, msg) => {
    if (typeof msg !== "string")
        return socket.emit("pmgh{bru4_m0m3n7_gtf0_sk1d}");
    const player = await (0, database_js_1.databaseReadByToken)(token);
    if (player) {
        if (player.privilege > 0) {
            if (msg.startsWith("/"))
                return (0, command_js_1.handler)(socket, io, commands, player, msg);
            io.emit("MSG", player.username, player.ign, player.privilege, msg);
        }
        else
            socket.emit("ERR", "You are muted!");
    }
    else {
        socket.emit("ERR", "Malformed authentication token detected! Please reload the page.");
    }
};
exports.handler = handler;
//# sourceMappingURL=message.js.map