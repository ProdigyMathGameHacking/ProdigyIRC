import { Server, Socket } from "socket.io";
import { Command } from "../types/Command.js";
export declare const handler: (socket: Socket, io: Server, commands: Command[], token: string, msg: string) => Promise<boolean | undefined>;
//# sourceMappingURL=message.d.ts.map