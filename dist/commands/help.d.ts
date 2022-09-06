import { Server, Socket } from "socket.io";
import { Command } from "../types/Command";
import { Player } from "../types/Player";
export declare const run: (socket: Socket, _io: Server, commands: Command[], player: Player, args: string[]) => Promise<boolean | undefined>;
export declare const help: {
    name: string;
    description: string;
    usages: string[];
};
//# sourceMappingURL=help.d.ts.map