import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
export declare const run: (socket: Socket, io: Server, _player: Player, args: string[]) => Promise<void>;
export declare const help: {
    name: string;
    description: string;
    usages: string[];
};
//# sourceMappingURL=teleport.d.ts.map