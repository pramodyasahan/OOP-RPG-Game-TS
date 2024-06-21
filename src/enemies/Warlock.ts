import {Enemy} from "../entities/Enemy"
import {Entity} from "../entities/Entity"

export class Warlock extends Enemy {

    private darkBolt: number;
    private darkBoltChance: number;

    constructor(level: number) {
        super(level, "Warlock");
        this.darkBoltChance = 0.1;
        this.darkBolt = 30;
    }

    protected calculateHealth(level: number): number {
        switch (level) {
            case 1:
                return 75;
            case 2:
                this.darkBoltChance = 0.2;
                this.darkBolt = 32;
                return 100;
            case 3:
                this.darkBoltChance = 0.25;
                this.darkBolt = 35;
                return 125;
            case 4:
                this.darkBoltChance = 0.3;
                this.darkBolt = 38;
                return 150;
            case 5:
                this.darkBoltChance = 0.35;
                this.darkBolt = 40;
                return 200;
            default:
                this.darkBoltChance = 0.1;
                this.darkBolt = 30;
                return 75;
        }
    }

    attack(target: Entity): void {
        if (!this.isDefeated) {
            target.takeDamage(20);
        } else {
            console.log("Warlock is defeated...🏅")
        }
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDefeated = true;
        }
    }

    getDarkBolt(): number {
        console.log(`Warlock's Dark Bolt damage is ${this.darkBolt}`)
        return this.darkBolt
    }

    getDarkBoltChance(): number {
        console.log(`Warlock's Dark Bolt chance is ${this.darkBoltChance}`)
        return this.darkBoltChance
    }

    getHealth(): number {
        console.log(`Warlock has ${this.health} health left`)
        return this.health;
    }
}