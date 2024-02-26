import { Container } from "pixi.js";
import { Entity } from "./Entity";

export class PixiEntity extends Entity {
	private _pixiContainer: Container;
	constructor(pixiContainer: Container) {
		super();
		this._pixiContainer = pixiContainer;
	}

	public get pixiContainer(): Container {
		return this._pixiContainer;
	}
}
