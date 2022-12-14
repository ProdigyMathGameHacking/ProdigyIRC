"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
const message_1 = require("./events/message");
const userjoin_1 = require("./events/userjoin");
const temp_1 = require("./temp");
const app = (0, express_1.default)();
const http = require("http").Server(app);
const io = (0, socket_io_1.default)(http);
const dir = __dirname;
const PORT = (process.env.port) ? parseInt(process.env.port) : 3000;
const commands = [];
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(dir, `/client/index.html`));
});
app.use("/", express_1.default.static(path_1.default.join(dir, "/client/")));
fs_1.default.readdir(path_1.default.join(dir, "/commands/"), (err, files) => {
    if (err)
        return console.error(err);
    const jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        return console.log("No commands to be loaded!");
    }
    jsfiles.forEach(async (f, _i) => {
        const props = await Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, `/commands/${f}`))));
        commands.push({ name: props.help?.name, props: props });
    });
    console.log(`[Commands]\t Loaded ${jsfiles.length} commands!`);
});
io.on("connection", async (socket) => {
    const player = await (0, userjoin_1.handler)(socket, io);
    socket.emit("LOGGED_IN", player);
    io.emit("CON", player.username, player.ign, player.privilege);
    socket.on("MSG", (msg, token) => (0, message_1.handler)(socket, io, commands, token, msg));
    socket.on("disconnect", () => {
        io.emit("DISCON", player.username, player.ign, player.privilege);
    });
});
(0, temp_1.temp)();
http.listen(PORT, () => {
    console.log(`ProdigyIRC starting on port ${PORT}`);
});
