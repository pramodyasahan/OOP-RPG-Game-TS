import {Enemy} from "./Enemy";
import {EnemyData} from "../game/interfaces/enemyData";
import {Skeleton} from "../enemies/Skeleton";
import {Dragon} from "../enemies/Dragon";
import {Warlock} from "../enemies/Warlock";
import {Goblin} from "../enemies/Goblin";
import {Monster} from "../enemies/Monster";

export function createEnemyFromSavedData(data: EnemyData): Enemy {
    let enemy: Enemy;

    switch (data.type) {
        case 'Skeleton':
            enemy = new Skeleton(data.level);
            break;
        case 'Dragon':
            enemy = new Dragon(data.level);
            break;
        case 'Warlock':
            enemy = new Warlock(data.level);
            break;
        case 'Goblin':
            enemy = new Goblin(data.level);
            break;
        case 'Monster':
            enemy = new Monster(data.level);
            break;
        default:
            throw new Error(`Unknown enemy type: ${data.type}`);
    }

    enemy.health = data.health;
    enemy.isDefeated = data.isDefeated;
    return enemy;
}
