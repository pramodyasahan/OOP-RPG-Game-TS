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
import {Entity} from "./entities/Entity";
import {Player} from "./entities/Player";
import {Enemy} from "./entities/Enemy";

class GameSession {
    private static instance: GameSession | null;
    protected player: Player;
    protected enemy: Enemy;

    private constructor(player: Player, enemy: Enemy) {
        this.player = player;
        this.enemy = enemy;
    }

    public static getInstance(player: Player, enemy: Enemy): GameSession {
        if (!GameSession.instance) {
            GameSession.instance = new GameSession(player, enemy);
        }
        return GameSession.instance;
    }

    start(): void {
        console.log(`Starting game with ${this.player.name} vs ${this.enemy.name}`);
        while (!this.player.isDefeated && !this.enemy.isDefeated) {
            this.playerTurn();
            if (!this.enemy.isDefeated) {
                this.enemyTurn();
            }
        }
        this.endGame();
    }

    private playerTurn(): void {
        console.log(`Player's turn: ${this.player.name} attacks ${this.enemy.name}`);
        this.player.attack(this.enemy);
        this.enemy.getHealth();
    }

    private enemyTurn(): void {
        console.log(`Enemy's turn: ${this.enemy.name} attacks ${this.player.name}`);
        this.enemy.attack(this.player);
        this.player.getHealth();
    }

    private endGame(): void {
        if (this.player.isDefeated) {
            console.log(`${this.player.name} has been defeated. ${this.enemy.name} wins!`);
        } else {
            console.log(`${this.enemy.name} has been defeated. ${this.player.name} wins!`);
        }
        // Reset the instance after the game ends
        GameSession.instance = null;
    }
}

// Example usage
const player = new Archer('Player1'); // You can choose any player class: Archer, Cavalry, Infantry, Mage
const enemy = new Goblin(3); // You can choose any enemy class: Dragon, Goblin, Monster, Skeleton, Warlock

const gameSession = GameSession.getInstance(player, enemy);
gameSession.start();