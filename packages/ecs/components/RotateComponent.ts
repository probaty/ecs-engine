import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class RotateComponent extends Component {
	private _pixiContainer?: Container;
	private _rotate = 0;

	constructor(params: { rotate?: number; pixiContainer?: Container }) {
		super();
		if (params.rotate !== undefined) {
			this._rotate = params.rotate;
		}
		if (params.pixiContainer) {
			this._pixiContainer = params.pixiContainer;
		}
		if (this._pixiContainer) {
			this._pixiContainer.rotation = this._rotate;
		}
	}

	public get rotate(): number {
		if (this._pixiContainer) {
			return this._pixiContainer.rotation;
		}
		return this._rotate;
	}

	public set rotate(rotate: number) {
		if (this._pixiContainer) {
			this._pixiContainer.x = rotate;
		}
		this._rotate = rotate;
	}

	set pixiContainer(pixiContainer: Container) {
		this._pixiContainer = pixiContainer;
	}
}
