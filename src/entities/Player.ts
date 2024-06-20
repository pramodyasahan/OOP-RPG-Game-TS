import {Entity} from "./Entity"
import {Food} from "../inventory/types"
import {Inventory} from "../inventory/Inventory"

export abstract class Player implements Entity {
    isDefeated: boolean
    health: number;
    maxHealth: number;
    level: number;
    name: string;
    damageDeal: number
    inventory: Inventory;

    protected constructor(maxHealth: number, name: string) {
        this.maxHealth = maxHealth
        this.health = maxHealth;
        this.level = 1;
        this.damageDeal = 0;
        this.name = name;
        this.isDefeated = false;
        this.inventory = new Inventory();
        this.initializeInventory();
    }

    abstract attack(target: Entity): void;

    abstract takeDamage(amount: number): void;

    abstract getHealth(): number;

    protected levelUp(): void {
        this.level += 1;
    }

    private initializeInventory(): void {
        this.inventory.addItem({name: 'apple', healthGain: 10});
        this.inventory.addItem({name: 'health potion', healthGain: 50});
        this.inventory.addItem({name: 'meat', healthGain: 25});
    }

    eat(foodName: string): void {
        const food: Food | undefined = this.inventory.getFoodByName(foodName.toLowerCase());
        if (food) {
            if (this.maxHealth >= (this.health + food.healthGain)) {
                this.health += food.healthGain;
                this.inventory.removeItem(food);
                console.log(`${this.name} ate ${food.name} and gained ${food.healthGain} health.`);
            } else {
                this.health = this.maxHealth;
                this.inventory.removeItem(food);
                console.log(`${this.name} ate ${food.name} and gained ${this.maxHealth - this.health} health.`);
            }
        } else {
            console.log(`${this.name} does not have ${foodName} in the inventory.`);
        }
    }
}

export {Entity};
