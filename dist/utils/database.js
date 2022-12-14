"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseUpdateByUsername = exports.databaseUpdateByToken = exports.databaseWrite = exports.databaseReadByUsername = exports.databaseReadByToken = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const databaseReadByToken = async (token) => {
    const database = JSON.parse(fs_1.default.readFileSync((0, path_1.join)(__dirname, "../../userbase.json")).toString());
    return await database.find((entry) => entry.token === token);
};
exports.databaseReadByToken = databaseReadByToken;
const databaseReadByUsername = async (username) => {
    const database = JSON.parse(fs_1.default.readFileSync((0, path_1.join)(__dirname, "../../userbase.json")).toString());
    return await database.find((entry) => entry.username === username);
};
exports.databaseReadByUsername = databaseReadByUsername;
const databaseWrite = async (player) => {
    const database = JSON.parse(fs_1.default.readFileSync((0, path_1.join)(__dirname, "../../userbase.json")).toString());
    database.push(player);
    await fs_1.default.writeFileSync((0, path_1.join)(__dirname, "../../userbase.json"), JSON.stringify(database));
};
exports.databaseWrite = databaseWrite;
const databaseUpdateByToken = async (player, token) => {
    const database = JSON.parse(fs_1.default.readFileSync((0, path_1.join)(__dirname, "../../userbase.json")).toString());
    let existingUser = database.find((user) => user.token === token);
    if (existingUser) {
        database[database.indexOf(existingUser)] = player;
    }
    await fs_1.default.writeFileSync((0, path_1.join)(__dirname, "../../userbase.json"), JSON.stringify(database));
};
exports.databaseUpdateByToken = databaseUpdateByToken;
const databaseUpdateByUsername = async (player, username) => {
    const database = JSON.parse(fs_1.default.readFileSync((0, path_1.join)(__dirname, "../../userbase.json")).toString());
    let existingUser = database.find((user) => user.username === username);
    if (existingUser) {
        database[database.indexOf(existingUser)] = player;
    }
    await fs_1.default.writeFileSync((0, path_1.join)(__dirname, "../../userbase.json"), JSON.stringify(database));
};
exports.databaseUpdateByUsername = databaseUpdateByUsername;
