import _ from 'lodash';
import { Item } from "./Item";
import { Food } from "./types";

export class Inventory {
    items: (Food | Item)[] = [];

    addItem(item: Food | Item): void {
        this.items.push(item);
    }

    removeItem(item: Food | Item): void {
        _.remove(this.items, i => i.name === item.name);
    }

    listItems(): (Food | Item)[] {
        _.each(this.items, item =>
            console.log(`${item.name}: ${item instanceof Item ? item.effect : `Health Gain: ${item.healthGain}`}`)
        );
        return this.items
    }

    getFoodByName(name: string): Food | undefined {
        return _.find(this.items, (item): item is Food => 'healthGain' in item && item.name === name);
    }
}
