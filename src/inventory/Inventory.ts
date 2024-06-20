import {Item} from "./Item"
import {Food} from "./types"

export class Inventory {
    protected items: (Food | Item)[] = [];

    addItem(item: Food | Item): void {
        this.items.push(item);
    }

    removeItem(item: Food | Item): void {
        this.items = this.items.filter(i => i.name !== item.name);
    }

    listItems(): void {
        this.items.forEach(item => console.log(`${item.name}: ${item instanceof Item ? item.effect : `Health Gain: ${item.healthGain}`}`));
    }

    getFoodByName(name: string): Food | undefined {
        for (const item of this.items) {
            if ('healthGain' in item && item.name === name) {
                return item as Food;
            }
        }
        return undefined;
    }
}