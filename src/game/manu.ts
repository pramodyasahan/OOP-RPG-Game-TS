import {askQuestion, rl} from "../utils/inputUtils";

export class Menu {
    showMenu(callback: (choice: string) => void): void {
        console.log("\n=== Main Menu ===");
        console.log("1. Start New Game");
        console.log("2. Load Game");
        console.log("3. About");
        console.log("4. Exit");

        askQuestion("Enter the number of your choice: ").then(callback);
    }

    close(): void {
        rl.close();
    }
}

export function showAbout(): void {
    console.log("\n=== About ===");
    console.log("This is a text-based RPG game where you can fight enemies, level up, and progress through different levels.");
    console.log("Developed by: Your Name");
    console.log("Enjoy the game!\n");
}
