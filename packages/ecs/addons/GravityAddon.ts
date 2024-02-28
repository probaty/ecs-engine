import type { Application, ICanvas } from "pixi.js";
import { Addon } from "../core/Addon";
import { Engine, Runner } from "matter-js";
import type { BasicGameState, Game } from "../core/Game";

export type GravityGS = {
	gravity: Engine;
};

type GS = BasicGameState & GravityGS;

export class GravityAddon extends Addon<GS> {
	public name = "gravity";
	public onCreate(gameState: GS): void {
		gameState.gravity = Engine.create();
		Runner.run(gameState.gravity);
	}
	public onDestroy(gameState: GS): void {
		Engine.clear(gameState.gravity);
	}
}
