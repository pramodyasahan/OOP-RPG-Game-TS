import {Enemy} from "../entities/Enemy"
import {Player} from "../entities/Player"

export class Cavalry extends Player {
    private chargeAttackBonus: number;
    private chargeAttackChance: number;

    constructor() {
        super(110, "Cavalry");
        this.chargeAttackBonus = 20;
        this.chargeAttackChance = 0.1;
    }

    attack(target: Enemy): void {
        if (!this.isDefeated) {
            const isChargeAttack: boolean = target.getRandomInt(0, 1) < this.chargeAttackChance;
            let damageDone: number;

            if (isChargeAttack) {
                switch (target.type) {
                    case "Goblin":
                        damageDone = this.chargeAttackBonus + 10;
                        break;
                    case "Dragon":
                        damageDone = this.chargeAttackBonus + 15;
                        break;
                    default:
                        damageDone = this.chargeAttackBonus;
                        break;
                }
                console.log(`Charge Attack!💥 damage done ${damageDone}`);
            } else {
                switch (target.type) {
                    case "Goblin":
                        damageDone = 15;
                        break;
                    case "Dragon":
                        damageDone = 20;
                        break;
                    default:
                        damageDone = 10;
                        break;
                }
                console.log(`Damage done ${damageDone}`);
            }

            target.takeDamage(damageDone);
            this.damageDeal += damageDone;

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.name} level up to: ${this.level} ⬆ `);
                super.levelUp();
                this.chargeAttackChance = Math.min(this.chargeAttackChance + 0.02, 0.5);
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
            console.log(`${this.name} already has been defeated!!!`)
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
