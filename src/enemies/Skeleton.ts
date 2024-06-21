import {Enemy} from "../entities/Enemy"
import {Entity} from "../entities/Entity"

export class Skeleton extends Enemy {

    protected calculateHealth(level: number): number {
        switch (level) {
            case 1:
                return 50;
            case 2:
                return 70;
            case 3:
                return 90;
            case 4:
                return 100;
            case 5:
                return 125;
            default:
                return 50;
        }
    }

    constructor(level: number) {
        super(level, "Skeleton");
    }

    attack(target: Entity): void {
        if (!this.isDefeated) {
            target.takeDamage(12);
        } else {
            console.log("Skeleton is defeated...🏅")
        }
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDefeated = true;
        }
    }

    getHealth(): number {
        console.log(`Skeleton has ${this.health} health left`)
        return this.health;
    }
}