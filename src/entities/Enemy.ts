import {Entity} from "./Entity"

export abstract class Enemy implements Entity {
    health: number;
    level: number;
    isDefeat: boolean;

    protected constructor(level: number) {
        this.isDefeat = false;
        this.health = this.calculateHealth(level);
        this.level = level;
    }

    protected abstract calculateHealth(level: number): number;

    abstract attack(target: Entity): void;

    abstract takeDamage(amount: number): void;

    abstract getHealth(): number;
}