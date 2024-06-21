import {Enemy} from "../entities/Enemy"
import {Player} from "../entities/Player"

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
        super(level, "Goblin");
    }

    attack(target: Player): void {
        if (!this.isDefeated) {
            target.takeDamage(10);
        } else {
            console.log("Goblin is defeated...🏅")
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
        console.log(`Goblin has ${this.health} health left`)
        return this.health;
    }
}