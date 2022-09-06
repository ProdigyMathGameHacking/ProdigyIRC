import { Socket, Server } from "socket.io";
import { Command } from "../types/Command";
import { Player } from "../types/Player";
export declare const handler: (socket: Socket, io: Server, commands: Command[], player: Player, msg: string) => Promise<boolean | undefined>;
//# sourceMappingURL=command.d.ts.map