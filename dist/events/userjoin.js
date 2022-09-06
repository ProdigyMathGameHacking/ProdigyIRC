"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const database_js_1 = require("../utils/database.js");
const usercreate_js_1 = require("./usercreate.js");
const handler = async (socket, io) => {
    return new Promise((res, rej) => {
        socket.emit("REQ_AUTH");
        socket.once("RES_AUTH", async (authToken) => {
            if (!(authToken && authToken.length > 0)) {
                authToken = await (0, usercreate_js_1.handler)(socket, io);
            }
            let user = await (0, database_js_1.databaseReadByToken)(authToken);
            if (user) {
                if (user.privilege < 0) {
                    socket.emit("ERR", "Your account is banned!");
                    socket.disconnect();
                    return rej(new Error("Account banned."));
                }
                socket.emit("UPDATE_AUTH", authToken);
            }
            else {
                socket.emit("ERR", "Malformed authentication token detected! Creating account instead...");
                authToken = await (0, usercreate_js_1.handler)(socket, io);
                socket.emit("UPDATE_AUTH", authToken);
                user = await (0, database_js_1.databaseReadByToken)(authToken);
            }
            user.socketID = socket.id;
            (0, database_js_1.databaseUpdateByToken)(user, authToken);
            res(user);
        });
    });
};
exports.handler = handler;
//# sourceMappingURL=userjoin.js.map