import {Player} from "../entities/Player";
import {Enemy} from "../entities/Enemy";
import {PlayerData} from "../game/interfaces/playerData";
import {Level} from "./levels";
import {createPlayerFromSavedData} from "../entities/playerFactory";
import {selectPlayerType, selectNewPlayerType} from "../entities/userFactory";
import {isFood, isItem} from "../utils/typeGuards";
import * as fs from 'fs';
import * as path from 'path';

interface GameState {
    players: PlayerData[];
    currentLevelNumber: number;
    enemies: {
        type: string;
        health: number;
        level: number;
        isDefeated: boolean;
    }[];
}

export class GameSession {
    private players: Player[];
    private currentLevel: Level;
    private currentLevelNumber: number;
    private saveFilePath: string;

    constructor(players: Player[], saveFilePath: string = 'gameData.json') {
        this.players = players;
        this.currentLevelNumber = 1;
        this.currentLevel = new Level(this.currentLevelNumber);
        this.saveFilePath = path.resolve(__dirname, saveFilePath);
    }

    // Save the current game state to a file
    saveGame(): void {
        const gameState: GameState = this.createGameState();
        fs.writeFileSync(this.saveFilePath, JSON.stringify(gameState, null, 2));
    }

    // Load a saved game state from a file
    loadGame(): void {
        if (fs.existsSync(this.saveFilePath)) {
            try {
                const savedGameState = fs.readFileSync(this.saveFilePath, 'utf8');
                const gameState: GameState = JSON.parse(savedGameState);
                this.applyGameState(gameState);
            } catch (error) {
                console.error("Failed to parse saved game data:", error);
            }
        }
    }

    // Start a new game session
    async startNewGame(): Promise<void> {
        this.clearSaveFile();
        this.players = [await selectPlayerType()];
        this.saveGame();
        this.initializeGameState();
    }

    // Check if there is a saved game
    hasSavedGame(): boolean {
        return fs.existsSync(this.saveFilePath);
    }

    // Proceed to the next level
    async nextLevel(): Promise<void> {
        if (this.currentLevelNumber < 25) {
            this.currentLevelNumber++;
            this.currentLevel = new Level(this.currentLevelNumber);
            this.resetPlayersHealth();

            if (this.currentLevelNumber === 10 || this.currentLevelNumber === 20) {
                await this.addNewPlayerType();
            }
        } else {
            console.log("Congratulations! You have completed all levels.");
        }
    }

    // Get current enemies
    getCurrentEnemies(): Enemy[] {
        return this.currentLevel.getEnemies();
    }

    // Get current level number
    getCurrentLevelNumber(): number {
        return this.currentLevel.getLevelNumber();
    }

    // Get players
    getPlayers(): Player[] {
        return this.players;
    }

    // Create the game state object
    private createGameState(): GameState {
        return <GameState>{
            players: this.players.map(player => ({
                type: player.type,
                health: player.health,
                maxHealth: player.maxHealth,
                level: player.level,
                isDefeated: player.isDefeated,
                inventory: player.inventory.items.map(item => isFood(item) ? {
                    ...item,
                    healthGain: item.healthGain
                } : {...item, effect: item.effect}),
                damageDeal: player.damageDeal,
            })),
            currentLevelNumber: this.currentLevelNumber,
            enemies: this.currentLevel.getEnemies().map(enemy => ({
                type: enemy.type,
                health: enemy.health,
                level: enemy.level,
                isDefeated: enemy.isDefeated,
            }))
        };
    }

    // Apply a loaded game state
    private applyGameState(gameState: GameState): void {
        this.players = gameState.players.map(playerData => createPlayerFromSavedData(playerData));
        this.currentLevelNumber = gameState.currentLevelNumber;
        this.currentLevel = new Level(this.currentLevelNumber);
        this.currentLevel.getEnemies().forEach((enemy, index) => {
            enemy.health = gameState.enemies[index].health;
            enemy.isDefeated = gameState.enemies[index].isDefeated;
        });
    }

    // Clear the save file
    private clearSaveFile(): void {
        fs.writeFileSync(this.saveFilePath, '');
    }

    // Initialize the game state
    private initializeGameState(): void {
        this.currentLevelNumber = 1;
        this.currentLevel = new Level(this.currentLevelNumber);
    }

    // Reset players' health
    private resetPlayersHealth(): void {
        this.players.forEach(player => player.resetHealth());
    }

    // Add a new player type at specific levels
    private async addNewPlayerType(): Promise<void> {
        const existingPlayerTypes = this.players.map(player => player.constructor.name);
        const newPlayer = await selectNewPlayerType(existingPlayerTypes);
        this.players.push(newPlayer);
        this.saveGame();
    }
}
