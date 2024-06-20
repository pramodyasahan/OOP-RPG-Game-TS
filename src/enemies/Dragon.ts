import {Enemy} from "../entities/Enemy"
import {Entity} from "../entities/Entity"


export class Dragon extends Enemy {
    private fireBreath: number;
    private fireBreathChance: number;

    constructor(level: number) {
        super(level);
        this.fireBreathChance = 0.2;
        this.fireBreath = 35;
    }

    protected calculateHealth(level: number): number {
        switch (level) {
            case 1:
                return 500;
            case 2:
                this.fireBreathChance = 0.22;
                this.fireBreath = 35;
                return 600;
            case 3:
                this.fireBreathChance = 0.28;
                this.fireBreath = 38;
                return 700;
            case 4:
                this.fireBreathChance = 0.30;
                this.fireBreath = 40;
                return 850;
            case 5:
                this.fireBreathChance = 0.35;
                this.fireBreath = 44;
                return 1000;
            default:
                this.fireBreathChance = 0.2;
                this.fireBreath = 35;
                return 500;
        }
    }


    attack(target: Entity): void {
        if (!this.isDefeat) {
            if (Math.random() < this.fireBreathChance) {
                target.takeDamage(this.fireBreath)
            } else {
                target.takeDamage(25);
            }
        } else {
            console.log("Dragon is defeated...🏅")
        }
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDefeat = true;
        }
    }

    getFireBreath(): number {
        console.log(`Dragon's Fire Breath damage is ${this.fireBreath}`)
        return this.fireBreath
    }

    getFireBreathChance(): number {
        console.log(`Dragon's Fire Breath chance is ${this.fireBreathChance}`)
        return this.fireBreathChance
    }

    getHealth(): number {
        console.log(`Dragon has ${this.health} health left`)
        return this.health;
    }
}