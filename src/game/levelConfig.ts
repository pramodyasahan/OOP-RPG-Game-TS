import {Enemy} from "../entities/Enemy";
import {Skeleton} from "../enemies/Skeleton";
import {Goblin} from "../enemies/Goblin";
import {Warlock} from "../enemies/Warlock";
import {Dragon} from "../enemies/Dragon";
import {Monster} from "../enemies/Monster";

export class LevelConfig {
    static getEnemiesForLevel(levelNumber: number): Enemy[] {
        const enemies: Enemy[] = [];

        switch (levelNumber) {
            case 1:
                enemies.push(new Skeleton(1));
                break;
            case 2:
                enemies.push(new Skeleton(1), new Goblin(2));
                break;
            case 3:
                enemies.push(new Goblin(1), new Skeleton(3));
                break;
            case 4:
                enemies.push(new Goblin(2), new Skeleton(4));
                break;
            case 5:
                enemies.push(new Goblin(2), new Skeleton(4), new Warlock(1)); // Boss level
                break;
            case 6:
                enemies.push(new Goblin(2), new Skeleton(4), new Warlock(2));
                break;
            case 7:
                enemies.push(new Goblin(3), new Skeleton(5), new Warlock(2));
                break;
            case 8:
                enemies.push(new Goblin(3), new Skeleton(5), new Warlock(3));
                break;
            case 9:
                enemies.push(new Goblin(4), new Skeleton(5), new Warlock(3));
                break;
            case 10:
                enemies.push(new Goblin(5), new Monster(1), new Warlock(4)); // Boss level
                break;
            case 11:
                enemies.push(new Goblin(4), new Monster(2), new Warlock(4));
                break;
            case 12:
                enemies.push(new Goblin(5), new Monster(2), new Warlock(5));
                break;
            case 13:
                enemies.push(new Goblin(5), new Monster(3), new Warlock(5));
                break;
            case 14:
                enemies.push(new Goblin(5), new Monster(4), new Warlock(5));
                break;
            case 15:
                enemies.push(new Goblin(5), new Monster(5), new Warlock(5), new Dragon(1)); // Boss level
                break;
            case 16:
                enemies.push(new Goblin(5), new Monster(5), new Warlock(5), new Dragon(2));
                break;
            case 17:
                enemies.push(new Goblin(5), new Monster(5), new Warlock(5), new Dragon(3));
                break;
            case 18:
                enemies.push(new Goblin(5), new Monster(5), new Warlock(5), new Dragon(4));
                break;
            case 19:
                enemies.push(new Goblin(5), new Monster(5), new Warlock(5), new Dragon(5));
                break;
            case 20:
                enemies.push(new Skeleton(5), new Goblin(5), new Monster(5), new Warlock(5), new Dragon(5)); // Final level
                break;
            default:
                enemies.push(new Skeleton(1)); // Default case
        }

        return enemies;
    }
}
