//import player profiles
import {Archer} from "./players/Archer"
import {Cavalry} from "./players/Cavalry"
import {Infantry} from "./players/Infantry"
import {Mage} from "./players/Mage"

//import enemy profiles
import {Dragon} from "./enemies/Dragon"
import {Goblin} from "./enemies/Goblin"
import {Monster} from "./enemies/Monster"
import {Skeleton} from "./enemies/Skeleton"
import {Warlock} from "./enemies/Warlock"

// Create player instances
const infantry = new Infantry('Conan');
const mage = new Mage('Gandalf');
const archer = new Archer('Robin');
const cavalry = new Cavalry('Arthur');

// Create enemy instances
const goblin = new Goblin(1);
const dragon = new Dragon(1);
const monster = new Monster(2)
const skeleton = new Skeleton(3)
const warlock = new Warlock(4)
