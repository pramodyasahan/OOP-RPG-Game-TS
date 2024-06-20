import {Enemy} from "../entities/Enemy"
import {Entity} from "../entities/Entity"


export class Monster extends Enemy {

    protected calculateHealth(level: number): number {
        switch (level) {
            case 1:
                return 100;
            case 2:
                return 125;
            case 3:
                return 150;
            case 4:
                return 200;
            case 5:
                return 250;
            default:
                return 100;
        }
    }

    constructor(level: number) {
        super(level);
    }

    attack(target: Entity): void {
        if (!this.isDefeat) {
            target.takeDamage(15);
        } else {
            console.log("Monster is defeated...🏅")
        }
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDefeat = true;
        }
    }

    getHealth(): number {
        console.log(`Monster has ${this.health} health left`)
        return this.health;
    }
}