import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class ScaleComponent extends Component {
	private _pixiContainer?: Container;
	private _scaleX = 1;
	private _scaleY = 1;

	constructor(params: { scaleX?: number; scaleY?: number; pixiContainer?: Container }) {
		super();
		if (params.scaleX !== undefined) {
			this._scaleX = params.scaleX;
		}
		if (params.scaleY !== undefined) {
			this._scaleY = params.scaleY;
		}
		if (params.pixiContainer) {
			this._pixiContainer = params.pixiContainer;
		}
		if (this._pixiContainer) {
			this._pixiContainer.scale.set(this._scaleX, this._scaleY);
		}
	}

	public get scaleX(): number {
		if (this._pixiContainer) {
			return this._pixiContainer.scale.x;
		}
		return this._scaleX;
	}

	public get scaleY(): number {
		if (this._pixiContainer) {
			return this._pixiContainer.scale.y;
		}
		return this._scaleY;
	}

	public set scaleX(scaleX: number) {
		if (this._pixiContainer) {
			this._pixiContainer.scale.x = scaleX;
		}
		this._scaleX = scaleX;
	}

	public set scaleY(scaleY: number) {
		if (this._pixiContainer) {
			this._pixiContainer.scale.y = scaleY;
		}
		this._scaleY = scaleY;
	}
	set pixiContainer(pixiContainer: Container) {
		this._pixiContainer = pixiContainer;
	}
}
