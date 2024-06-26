import {Enemy} from "../entities/Enemy"
import {Player} from "../entities/Player"

export class Mage extends Player {
    private mana: number;
    private manaStorage: number;

    constructor() {
        super(90, "Mage");
        this.manaStorage = 100;
        this.mana = this.manaStorage;
    }

    attack(target: Enemy): void {
        if (!this.isDefeated) {
            let damageDone: number;

            if (target.type === "Warlock") {
                if (this.mana >= 40) {
                    damageDone = 35;
                    this.mana -= 35;
                } else {
                    damageDone = 20;
                }
            } else {
                if (this.mana >= 40) {
                    damageDone = 20;
                    this.mana -= 20;
                } else {
                    damageDone = 10;
                }
            }

            target.takeDamage(damageDone);
            this.damageDeal += damageDone;

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.type} level up to: ${this.level} ⬆ `);
                super.levelUp();
                this.maxHealth += 10;
                this.manaStorage += 5;
                if (this.manaStorage > 200) {
                    this.manaStorage = 200;
                }
            }
        }

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
            console.log(`${this.type} has been defeated!!!`)
        }
    }

    regenerateMana(): void {
        this.mana += 10;
        if (this.mana > this.manaStorage) {
            this.mana = this.manaStorage;
        }
    }

    getMana(): number {
        console.log(`${this.type} has ${this.mana} mana left`)
        return this.mana;
    }

    getManaStorage(): number {
        console.log(`${this.type} has ${this.manaStorage} of mana storage`)
        return this.manaStorage;
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
