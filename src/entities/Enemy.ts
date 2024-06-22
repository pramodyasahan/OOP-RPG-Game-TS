import {Entity} from "../game/interfaces/Entity";

export abstract class Enemy implements Entity {
    health: number;
    level: number;
    type: string;
    isDefeated: boolean;

    protected constructor(level: number, type: string) {
        this.isDefeated = false;
        this.type = type;
        this.health = this.calculateHealth(level);
        this.level = level;
    }

    protected abstract calculateHealth(level: number): number;

    abstract attack(target: Entity): void;

    abstract takeDamage(amount: number): void;

    abstract getHealth(): number;

    public getRandomInt(min: number, max: number): number {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
}
