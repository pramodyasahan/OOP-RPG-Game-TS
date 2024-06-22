import {askQuestion} from "../utils/inputUtils";
import {Player} from "./Player";
import {Archer} from "../players/Archer";
import {Mage} from "../players/Mage";
import {Infantry} from "../players/Infantry";
import {Cavalry} from "../players/Cavalry";

export async function selectPlayerType(): Promise<Player> {
    const playerTypes = {
        '1': Archer,
        '2': Mage,
        '3': Infantry,
        '4': Cavalry
    };

    console.log("Select your player type:");
    console.log("1. Archer");
    console.log("2. Mage");
    console.log("3. Infantry");
    console.log("4. Cavalry");

    while (true) {
        const input = await askQuestion("Enter the number of your choice: ");
        const PlayerClass = playerTypes[input as keyof typeof playerTypes];
        if (PlayerClass) {
            return new PlayerClass();
        } else {
            console.log("Invalid selection. Please try again!!!");
        }
    }
}

export async function selectNewPlayerType(existingPlayerTypes: string[]): Promise<Player> {
    const playerTypes = {
        '1': Archer,
        '2': Mage,
        '3': Infantry,
        '4': Cavalry
    };

    console.log("You can select a new player type:");
    const remainingTypes = Object.keys(playerTypes).filter(type => !existingPlayerTypes.includes(type));
    remainingTypes.forEach(type => {
        console.log(`${type}. ${playerTypes[type as keyof typeof playerTypes].name}`);
    });

    while (true) {
        const input = await askQuestion("Enter the number of your choice: ");
        const PlayerClass = playerTypes[input as keyof typeof playerTypes];
        if (PlayerClass && remainingTypes.includes(input)) {
            return new PlayerClass();
        } else {
            console.log("Invalid selection or type already chosen. Please try again!!!");
        }
    }
}
