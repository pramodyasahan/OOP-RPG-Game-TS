export interface Entity {
    isDefeated: boolean;
    health: number;
    level: number;

    attack(target: Entity): void;
    takeDamage(amount: number): void;
    getHealth(): number;
    getRandomInt(min: number, max: number): number;
}
