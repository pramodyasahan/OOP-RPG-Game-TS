import {Player} from "./Player";
import {Archer} from "../players/Archer";
import {Mage} from "../players/Mage";
import {Cavalry} from "../players/Cavalry";
import {Infantry} from "../players/Infantry";
import {PlayerData} from "../game/interfaces/playerData";


export function createPlayerFromSavedData(data: PlayerData): Player {
    console.log('Data received for player creation:', data);  // Add this line for debugging
    if (!data.type) {
        throw new Error(`Invalid player data: ${JSON.stringify(data)}`);  // Improve error message
    }
    let player: Player;

    switch (data.type) {
        case 'Archer':
            player = new Archer();
            break;
        case 'Mage':
            player = new Mage();
            break;
        case 'Cavalry':
            player = new Cavalry();
            break;
        case 'Infantry':
            player = new Infantry();
            break;
        default:
            throw new Error(`Unknown player type: ${data.type}`);
    }

    player.health = data.health;
    player.level = data.level;
    player.isDefeated = data.isDefeated;
    player.damageDeal = data.damageDeal;
    player.inventory.items = data.inventory;
    return player;
}
