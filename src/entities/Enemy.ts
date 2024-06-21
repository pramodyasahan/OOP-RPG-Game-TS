import {Entity} from "./Entity"

export abstract class Enemy implements Entity {
    health: number;
    level: number;
    name: string;
    isDefeated: boolean;

    protected constructor(level: number, name: string) {
        this.isDefeated = false;
        this.name = name
        this.health = this.calculateHealth(level);
        this.level = level;
    }

    protected abstract calculateHealth(level: number): number;

    abstract attack(target: Entity): void;

    abstract takeDamage(amount: number): void;

    abstract getHealth(): number;


}