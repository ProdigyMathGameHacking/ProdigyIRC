import { Player } from "../types/Player";
export declare const databaseReadByToken: (token: string) => Promise<Player>;
export declare const databaseReadByUsername: (username: string) => Promise<Player>;
export declare const databaseWrite: (player: Player) => Promise<void>;
export declare const databaseUpdateByToken: (player: Player, token: string) => Promise<void>;
export declare const databaseUpdateByUsername: (player: Player, username: string) => Promise<void>;
//# sourceMappingURL=database.d.ts.map