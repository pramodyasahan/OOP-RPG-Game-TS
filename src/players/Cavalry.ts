import {Entity} from "../entities/Entity"
import {Player} from "../entities/Player"

export class Cavalry extends Player {
    private chargeAttackBonus: number;
    private chargeAttackChance: number;

    constructor(name: string) {
        super(110, name);
        this.chargeAttackBonus = 20;
        this.chargeAttackChance = 0.1;
    }

    attack(target: Entity): void {
        if (!this.isDefeated) {
            const isChargeAttack: boolean = Math.random() < this.chargeAttackChance;
            if (isChargeAttack) {
                target.takeDamage(this.chargeAttackBonus);
                this.damageDeal += this.chargeAttackBonus;
                console.log("Charge Attack!💥");
            } else {
                target.takeDamage(10);
                this.damageDeal += 10;
            }

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.name} level up to: ${this.level} ⬆ `);
                super.levelUp();
                this.chargeAttackChance += 0.02;
                if (this.chargeAttackChance > 0.5) {
                    this.chargeAttackChance = 0.5;
                }
            }

            if (this.level % 5 === 0) {
                this.chargeAttackBonus += 5;
            }
        }
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

    getChargeAttackBonus(): number {
        console.log(`${this.name} has ${this.chargeAttackBonus} charge attack bonus`)
        return this.chargeAttackBonus;
    }

    getChargeAttackChance(): number {
        console.log(`${this.name} has ${this.chargeAttackChance} charge attack chance`)
        return this.chargeAttackChance;
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
