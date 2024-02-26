import type { Application } from "pixi.js";

export abstract class Addon<GS> {
	public abstract name: string;
	public abstract onCreate(gameState: GS, app: Application): void;
	public abstract onDestroy(gameState: GS, app: Application): void;
}
