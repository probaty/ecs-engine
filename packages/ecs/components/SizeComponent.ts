import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class PositionComponent extends Component {
	private _pixiContainer?: Container;
	private _width = 0;
	private _height = 0;

	constructor(params: { width?: number; hight?: number; pixiContainer?: Container }) {
		super();
		if (params.width !== undefined) {
			this._width = params.width;
		}
		if (params.hight !== undefined) {
			this._height = params.hight;
		}
		if (params.pixiContainer) {
			this._pixiContainer = params.pixiContainer;
		}
		if (this._pixiContainer) {
			this._pixiContainer.width = this._width;
			this._pixiContainer.height = this._height;
		}
	}

	public get width(): number {
		if (this._pixiContainer) {
			return this._pixiContainer.width;
		}
		return this._width;
	}

	public get height(): number {
		if (this._pixiContainer) {
			return this._pixiContainer.height;
		}
		return this._height;
	}

	public set width(width: number) {
		if (this._pixiContainer) {
			this._pixiContainer.x = width;
		}
		this._width = width;
	}

	public set height(height: number) {
		if (this._pixiContainer) {
			this._pixiContainer.height = height;
		}
		this._height = height;
	}
	set pixiContainer(pixiContainer: Container) {
		this._pixiContainer = pixiContainer;
	}
}
