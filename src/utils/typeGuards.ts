import { Food } from "../inventory/types";
import {Item} from "../inventory/Item";

export function isFood(item: Food | Item): item is Food {
    return (item as Food).healthGain !== undefined;
}

export function isItem(item: Food | Item): item is Item {
    return (item as Item).effect !== undefined;
}
