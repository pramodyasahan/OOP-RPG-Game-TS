import { GameSession } from "./game/gameSession";
import { selectPlayerType } from "./entities/userFactory";
import { Menu, showAbout } from "./game/manu";
import { rl } from "./utils/inputUtils";
import { Player } from "./entities/Player";

const menu = new Menu();

async function startNewGame(): Promise<GameSession> {
    const firstPlayer = await selectPlayerType();
    const gameSession = new GameSession([firstPlayer]);
    await gameSession.startNewGame();
    return gameSession;
}

function loadGame(): GameSession {
    const players: Player[] = []; // Placeholder for player loading logic
    const gameSession = new GameSession(players);
    if (gameSession.hasSavedGame()) {
        gameSession.loadGame();
    } else {
        console.log("No saved game found. Starting a new game.");
    }
    return gameSession;
}

function mainMenu(): void {
    menu.showMenu(async (choice) => {
        switch (choice) {
            case '1':
                const newGameSession = await startNewGame();
                await runGame(newGameSession);
                break;
            case '2':
                const loadedGameSession = loadGame();
                await runGame(loadedGameSession);
                break;
            case '3':
                showAbout();
                mainMenu();
                break;
            case '4':
                console.log("Exiting the game. Goodbye!");
                rl.close(); // Close the readline interface here
                break;
            default:
                console.log("Invalid choice. Please enter a number between 1 and 4.");
                mainMenu();
                break;
        }
    });
}

async function runGame(gameSession: GameSession): Promise<void> {
    let gameOver = false;
    while (!gameOver) {
        console.log(`Level ${gameSession.getCurrentLevelNumber()} starts!`);

        const enemies = gameSession.getCurrentEnemies();
        const players = gameSession.getPlayers();

        while (enemies.some(enemy => !enemy.isDefeated) && players.some(player => !player.isDefeated)) {
            for (const player of players) {
                for (const enemy of enemies) {
                    if (!enemy.isDefeated && !player.isDefeated) {
                        player.attack(enemy);
                        if (!enemy.isDefeated) {
                            enemy.attack(player);
                        }
                    }
                }
            }
        }

        // Check if all enemies are defeated
        if (enemies.every(enemy => enemy.isDefeated)) {
            console.log(`Level ${gameSession.getCurrentLevelNumber()} completed!`);
            await gameSession.nextLevel();
        } else {
            gameOver = true;2

            console.log("Game Over. Try again!");
        }

        // Save the game state
        gameSession.saveGame();
    }

    // Return to the main menu after the game ends
    mainMenu();
}

// Start the game by showing the main menu
mainMenu();
