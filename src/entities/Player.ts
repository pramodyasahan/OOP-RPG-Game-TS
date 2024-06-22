import {Entity} from "../game/interfaces/Entity"
import {Food} from "../inventory/types"
import {Inventory} from "../inventory/Inventory"


export abstract class Player implements Entity {
    isDefeated: boolean;
    health: number;
    maxHealth: number;
    level: number;
    damageDeal: number;
    inventory: Inventory;
    type: string;

    protected constructor(maxHealth: number, type: string) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.level = 1;
        this.damageDeal = 0;
        this.isDefeated = false;
        this.inventory = new Inventory();
        this.type = type;
        this.initializeInventory();
    }

    abstract attack(target: Entity): void;

    abstract takeDamage(amount: number): void;

    abstract getHealth(): number;

    protected levelUp(): void {
        this.level += 1;
    }

    public getRandomInt(min: number, max: number): number {
        return (Math.floor(Math.random() * (max - min + 1)) + min)
    }

    private initializeInventory(): void {
        this.inventory.addItem({name: 'apple', healthGain: 10});
        this.inventory.addItem({name: 'health potion', healthGain: 50});
        this.inventory.addItem({name: 'meat', healthGain: 25});
    }

    public eat(foodName: string): void {
        const food: Food | undefined = this.inventory.getFoodByName(foodName.toLowerCase());
        if (food) {
            if (this.maxHealth >= (this.health + food.healthGain)) {
                this.health += food.healthGain;
                this.inventory.removeItem(food);
                console.log(`${this.type} ate ${food.name} and gained ${food.healthGain} health.`);
            } else {
                this.health = this.maxHealth;
                this.inventory.removeItem(food);
                console.log(`${this.type} ate ${food.name} and gained ${this.maxHealth - this.health} health.`);
            }
        } else {
            console.log(`${this.type} does not have ${foodName} in the inventory.`);
        }
    }

    resetHealth() {
        this.health = this.maxHealth
    }
}

