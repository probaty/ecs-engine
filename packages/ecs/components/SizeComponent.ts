import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class SizeComponent extends Component {
  private _width = 0;
  private _height = 0;

  constructor(params?: { width?: number; hight?: number; pixiContainer?: Container }) {
    super();
    if (!params) return
    if (params.width !== undefined) {
      this._width = params.width;
    }
    if (params.hight !== undefined) {
      this._height = params.hight;
    }
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public set width(width: number) {
    if (this._pixiContainer) {
      this._pixiContainer.x = width;
      this._pixiContainer.pivot.x = width / 2;
    }
    this._width = width;
  }

  public set height(height: number) {
    if (this._pixiContainer) {
      this._pixiContainer.height = height;
      this._pixiContainer.pivot.y = height / 2;
    }
    this._height = height;
  }
  set pixiContainer(pixiContainer: Container) {
    this._pixiContainer = pixiContainer;
    this._pixiContainer.width = this._width
    this._pixiContainer.height = this._height
    this._pixiContainer.pivot.set(this._width / 2, this._height / 2)
  }
}
