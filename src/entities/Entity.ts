export interface Entity {
    health: number;
    level: number;

    attack(target: Entity): void;

    takeDamage(amount: number): void;
}
