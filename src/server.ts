import fs from "fs";
import express from "express";
import socket from "socket.io";
import path from "path";
import { handler as messageHandler } from "./events/message.js";
import { handler as userJoinHandler } from "./events/userjoin.js";
import { Command } from "./types/Command.js";

const app = express();
const http = require("http").Server(app);
const io = socket(http);
const dir : string = __dirname;

const PORT : number = (process.env.port) ? parseInt(process.env.port) : 3000;

const commands: Command[] = [];

app.get("/", (_req, res) => {
	res.sendFile(path.resolve(dir, `/client/index.html`));
});
app.use("/", express.static(path.join(dir, "/client/")));

fs.readdir(path.resolve(dir, "/dist/commands/"), (err, files) => {
	if (err) return console.error(err);

	const jsfiles = files.filter(f => f.split(".").pop() === "js");

	if (jsfiles.length <= 0) {
		return console.log("No commands to be loaded!");
	}

	jsfiles.forEach(async(f, _i) => {
		const props = await import(`./commands/${f}`);
		commands.push({ name: props.help?.name, props: props });
	});

	console.log(`[Commands]\t Loaded ${jsfiles.length} commands!`);
});

io.on("connection", async (socket) => {
	// Handle user joining
	const player = await userJoinHandler(socket, io);

	socket.emit("LOGGED_IN", player)
	io.emit("CON", player.username, player.ign, player.privilege)

	// Set up message handler
	socket.on("MSG", (msg, token) => messageHandler(socket, io, commands, token, msg));

	// Set up disconnect handler
	socket.on("disconnect", () => {
		io.emit("DISCON", player.username, player.ign, player.privilege);
	})
});

http.listen(PORT, () => {
	console.log(`ProdigyIRC starting on port ${PORT}`);
});
