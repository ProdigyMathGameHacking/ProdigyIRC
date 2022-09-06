import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
export declare const run: (socket: Socket, _io: Server, player: Player, args: string[]) => Promise<boolean | undefined>;
export declare const help: {
    name: string;
    description: string;
    usages: string[];
};
//# sourceMappingURL=role.d.ts.map