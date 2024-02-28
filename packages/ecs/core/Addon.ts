import type { Application } from "pixi.js";
import type { BasicGameState } from "./Game";

export abstract class Addon<GS = BasicGameState> {
	public abstract name: string;
	public abstract onCreate(gameState: GS): void;
	public abstract onDestroy(gameState: GS): void;
}
