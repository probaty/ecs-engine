import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class ScaleComponent extends Component {
  private _scaleX = 1;
  private _scaleY = 1;

  constructor(params?: { scaleX?: number; scaleY?: number }) {
    super();
    if (!params) return
    if (params.scaleX !== undefined) {
      this._scaleX = params.scaleX;
    }
    if (params.scaleY !== undefined) {
      this._scaleY = params.scaleY;
    }
  }

  public get scaleX(): number {
    return this._scaleX;
  }

  public get scaleY(): number {
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
    this._pixiContainer.scale.x = this._scaleX
    this._pixiContainer.scale.y = this._scaleY
  }
}
