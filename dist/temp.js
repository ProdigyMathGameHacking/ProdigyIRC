"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temp = void 0;
const Player_1 = require("./types/Player");
const database_1 = require("./utils/database");
function temp() {
    const t = new Player_1.Player("retard", "waw", "a", "re", 3);
    (0, database_1.databaseWrite)(t);
}
exports.temp = temp;
