import {Enemy} from "../entities/Enemy"
import {Entity} from "../entities/Entity"

export class Goblin extends Enemy {

    protected calculateHealth(level: number): number {
        switch (level) {
            case 1:
                return 50;
            case 2:
                return 60;
            case 3:
                return 70;
            case 4:
                return 80;
            case 5:
                return 90;
            default:
                return 50;
        }
    }

    constructor(level: number) {
        super(level);
    }

    attack(target: Entity): void {
        if (!this.isDefeat) {
            target.takeDamage(10);
        } else {
            console.log("Goblin is defeated...🏅")
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
        console.log(`Goblin has ${this.health} health left`)
        return this.health;
    }
}