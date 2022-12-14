"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const privileges = require("../../privileges.json");
const handler = async (socket, io, commands, player, msg) => {
    msg = msg.slice(1);
    const messageArray = msg.split(/\s+/g);
    const commandName = messageArray.shift();
    const command = commands.find((command) => command.name == commandName);
    if (command) {
        const privilegeNeeded = privileges[command.name];
        if (player.privilege >= privilegeNeeded) {
            if (command.name == "help")
                command.props.run(socket, io, commands, player, messageArray);
            else
                command.props.run(socket, io, player, messageArray);
        }
        else {
            return socket.emit("ERR", "You don't have permission to run this command!");
        }
    }
};
exports.handler = handler;
