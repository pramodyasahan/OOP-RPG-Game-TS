import {Entity} from "../entities/Entity"
import {Player} from "../entities/Player"

export class Archer extends Player {
    private criticalHitChance: number;

    constructor(name: string) {
        super(80, name);
        this.criticalHitChance = 0.1;
    }

    attack(target: Entity): void {
        if (!this.isDefeated) {
            const isCriticalHit: boolean = Math.random() < this.criticalHitChance;
            if (isCriticalHit) {
                target.takeDamage(24);
                this.damageDeal += 24;
                console.log(`Critical hit!💥 damage dealt 24}`);
            } else {
                target.takeDamage(12);
                this.damageDeal += 12;
            }

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.name} level up to: ${this.level} ⬆ `);
                super.levelUp();
                this.criticalHitChance += 0.05;
                if (this.criticalHitChance > 0.5) {
                    this.criticalHitChance = 0.5;
                }
            }
        }
    }

    getCriticalHitChance(): number {
        console.log(`${this.name} has ${this.criticalHitChance} critical hit chance`)
        return this.criticalHitChance;
    }

    takeDamage(amount: number): void {
        if (!this.isDefeated) {
            this.health -= amount;
            if (this.health <= 0) {
                this.health = 0;
                this.isDefeated = true;
                console.log(`${this.name} is defeated☠️`);
            }
        } else {
            console.log(`${this.name} has been defeated!!!`)
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
