import {Entity} from "../entities/Entity"
import {Player} from "../entities/Player"

export class Mage extends Player {
    private mana: number;
    private manaStorage: number;

    constructor(name: string,) {
        super(90, name);
        this.manaStorage = 100;
        this.mana = this.manaStorage;
    }

    attack(target: Entity): void {
        if (!this.isDefeated) {
            if (this.mana >= 40) {
                target.takeDamage(20);
                this.damageDeal += 20;
                this.mana -= 20;
            } else {
                target.takeDamage(10);
                this.damageDeal += 10;
            }

            if (this.damageDeal % 10 === 0) {
                console.log(`${this.name} level up to: ${this.level} ⬆ `);
                super.levelUp()
                this.manaStorage += 5;
                if (this.manaStorage === 200) {
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
                console.log(`${this.name} is defeated☠️`);
            }
        } else {
            console.log(`${this.name} has been defeated!!!`)
        }
    }

    regenerateMana(): void {
        this.mana += 10;
        if (this.mana > this.manaStorage) {
            this.mana = this.manaStorage;
        }
    }

    getMana(): number {
        console.log(`${this.name} has ${this.mana} mana left`)
        return this.mana;
    }

    getManaStorage(): number {
        console.log(`${this.name} has ${this.manaStorage} of mana storage`)
        return this.manaStorage;
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
