import {Enemy} from "../entities/Enemy"
import {Player} from "../entities/Player"

export class Archer extends Player {
    private criticalHitChance: number;

    constructor() {
        super(80, "Archer");
        this.criticalHitChance = 0.1;
    }

    attack(target: Enemy): void {
        if (!this.isDefeated) {
            const isCriticalHit: boolean = Math.random() < this.criticalHitChance;
            let damageDone: number;

            if (isCriticalHit) {
                damageDone = target.type === "Skeleton" ? this.getRandomInt(25, 30) : this.getRandomInt(20, 24);
                console.log(`Critical hit!💥 damage dealt ${damageDone}`);
            } else {
                damageDone = target.type === "Skeleton" ? 18 : 12;
            }

            target.takeDamage(damageDone);
            this.damageDeal += damageDone;

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.type} level up to: ${this.level} ⬆ `);
                super.levelUp();
                this.maxHealth += 10;
                this.criticalHitChance = Math.min(this.criticalHitChance + 0.05, 0.5);
            }
        }
    }

    getCriticalHitChance(): number {
        console.log(`${this.type} has ${this.criticalHitChance} critical hit chance`)
        return this.criticalHitChance;
    }

    takeDamage(amount: number): void {
        if (!this.isDefeated) {
            this.health -= amount;
            if (this.health <= 0) {
                this.health = 0;
                this.isDefeated = true;
                console.log(`${this.type} is defeated☠️`);
            }
        } else {
            console.log(`${this.type} has already been defeated!!!`);
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
