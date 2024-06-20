import {Entity} from "../entities/Entity"
import {Player} from "../entities/Player"

export class Infantry extends Player {
    private shield: number;

    constructor(name: string) {
        super(120, name);
        this.shield = 50; // Initial shield value
    }

    attack(target: Entity): void {
        target.takeDamage(8);
        this.damageDeal += 8;
        if (this.damageDeal % 10 === 0) {
            console.log(`${this.name} level up to: ${this.level} ⬆ `);
            super.levelUp();
            this.shield += 5;
            if (this.shield === 200) {
                this.shield = 200;
            }
        }
    }

    takeDamage(amount: number): void {
        if (!this.isDefeated) {
            if (this.shield > 0) {
                const remainingDamage = amount - this.shield;
                this.shield = Math.max(this.shield - amount, 0); // Ensure shield doesn't go below 0
                if (remainingDamage > 0) {
                    this.health -= remainingDamage;
                }
            } else {
                this.health -= amount;
            }

            if (this.health <= 0) {
                this.health = 0;
                this.isDefeated = true;
                console.log(`${this.name} is defeated☠️`);
            }
        } else {
            console.log(`${this.name} has been defeated!!!`)
        }

    }


    getShield(): number {
        if (!this.isDefeated) {
            if (this.shield >= 0) {
                console.log(`${this.name} has ${this.shield} shield left`)
                return this.shield
            } else {
                this.shield = 0;
                console.log(`${this.name} has no shield left`)
                return 0
            }
        } else {
            console.log(`${this.name} has been defeated!!!`)
            return 0;
        }
    }

    getHealth(): number {
        if (!this.isDefeated) {
            console.log(`${this.name} has ${this.health} health left`)
            return this.health
        } else {
            console.log(`${this.name} has been defeated!!!`)
            return 0;
        }
    }

}