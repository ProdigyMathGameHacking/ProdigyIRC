import { Player } from "./types/Player";
import { databaseWrite } from "./utils/database";

export function temp () {

const t : Player = new Player("retard", "waw", "a", "re", 3);

databaseWrite(t);

}