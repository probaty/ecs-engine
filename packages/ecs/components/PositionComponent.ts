import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class PositionComponent extends Component {
  private _x = 0;
  private _y = 0;

  constructor(params?: { x?: number; y?: number }) {
    super();
    if (!params) return
    if (params.x !== undefined) {
      this._x = params.x;
    }
    if (params.y !== undefined) {
      this._y = params.y;
    }
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public set x(x: number) {
    if (this._pixiContainer) {
      this._pixiContainer.x = x;
    }
    this._x = x;
  }

  public set y(y: number) {
    if (this._pixiContainer) {
      this._pixiContainer.y = y;
    }
    this._y = y;
  }
  set pixiContainer(pixiContainer: Container) {
    this._pixiContainer = pixiContainer;
    this._pixiContainer.position.x = this._x
    this._pixiContainer.position.y = this._y
  }
}
