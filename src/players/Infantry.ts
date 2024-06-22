import {Enemy} from "../entities/Enemy"
import {Player} from "../entities/Player"

export class Infantry extends Player {
    private shield: number;

    constructor() {
        super(120, "Infantry");
        this.shield = 50; // Initial shield value
    }

    attack(target: Enemy): void {
        let damageDeal: number;
        if (target.type === "Monster") {
            damageDeal = 16;
            target.takeDamage(damageDeal);
            this.damageDeal += damageDeal;
        } else {
            damageDeal = 8;
            target.takeDamage(damageDeal);
            this.damageDeal += damageDeal;
        }

        if (this.damageDeal % 10 === 0) {
            console.log(`${this.type} level up to: ${this.level} ⬆ `);
            super.levelUp();
            this.maxHealth += 10;
            this.shield += 5;
            if (this.shield > 200) {
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
                console.log(`${this.type} is defeated☠️`);
            }
        } else {
            console.log(`${this.type} has been defeated!!!`)
        }

    }


    getShield(): number {
        if (!this.isDefeated) {
            if (this.shield >= 0) {
                console.log(`${this.type} has ${this.shield} shield left`)
                return this.shield
            } else {
                this.shield = 0;
                console.log(`${this.type} has no shield left`)
                return 0
            }
        } else {
            console.log(`${this.type} has been defeated!!!`)
            return 0;
        }
    }

    getHealth(): number {
        if (!this.isDefeated) {
            console.log(`${this.type} has ${this.health} health left`)
            return this.health
        } else {
            console.log(`${this.type} has been defeated!!!`)
            return 0;
        }
    }

}