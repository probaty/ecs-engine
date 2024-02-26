import type { Application } from "pixi.js";
import { Addon } from "../core/Addon";

export class MouseAddon<GS extends Record<string, any>> extends Addon<GS> {
	public name: string = "mouse";
	public onCreate(gameState: GS, app: Application): void {
		gameState.mouse.position = {};
		gameState.mouse.pressed = {};
		app.stage.eventMode = "static";
		app.stage.hitArea = app.screen;
		app.stage.on("pointermove", this._handlePointerMove.bind(this, gameState));
		app.stage.on("pointerdown", this._handlePointerDown.bind(this, gameState));
		app.stage.on("pointerup", this._handlePointerUp.bind(this, gameState));
	}

	public onDestroy(gameState: GS, app: Application): void {
		app.stage.off("pointermove", this._handlePointerMove.bind(this, gameState));
		app.stage.off("pointerdown", this._handlePointerDown.bind(this, gameState));
		app.stage.off("pointerup", this._handlePointerUp.bind(this, gameState));
	}

	private _handlePointerMove(gameState: GS, event: PointerEvent) {
		gameState.mouse.position = {
			x: event.clientX,
			y: event.clientY,
		};
	}

	private _handlePointerDown(gameState: GS, event: PointerEvent) {
		gameState.mouse.pressed[event.button] = true;
	}

	private _handlePointerUp(gameState: GS, event: PointerEvent) {
		gameState.mouse.pressed[event.button] = false;
	}
}
