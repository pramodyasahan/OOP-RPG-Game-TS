import {PlayerData} from "./playerData";

interface GameState {
    players: PlayerData[];
    currentLevelNumber: number;
    enemies: {
        type: string;
        health: number;
        level: number;
        isDefeated: boolean;
    }[];
}