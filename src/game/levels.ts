import { Enemy } from "../entities/Enemy";
import { LevelConfig } from "./levelConfig";

export class Level {
    private levelNumber: number;
    private enemies: Enemy[];

    constructor(levelNumber: number) {
        this.levelNumber = levelNumber;
        this.enemies = LevelConfig.getEnemiesForLevel(levelNumber);
    }

    getEnemies(): Enemy[] {
        return this.enemies;
    }

    getLevelNumber(): number {
        return this.levelNumber;
    }
}
