import { Item } from "../../inventory/Item";
import { Food } from "../../inventory/types";

export interface PlayerData {
    type: string;
    health: number;
    maxHealth: number;
    level: number;
    isDefeated: boolean;
    inventory: Food[] | Item[] ;
    damageDeal: number;
}
