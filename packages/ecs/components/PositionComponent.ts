import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class PositionComponent extends Component {
  private _x = 0;
  private _y = 0;
  private _angle = 0

  constructor(params?: { x?: number; y?: number, angle?: number }) {
    super();
    if (!params) return
    if (params.x !== undefined) {
      this._x = params.x;
    }
    if (params.y !== undefined) {
      this._y = params.y;
    }
    if (params.angle !== undefined) {
      this._angle = params.angle
    }
  }

  public get angle(): number {
    return this._angle;
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

  public set angle(angle: number) {
    if (this._pixiContainer) {
      this._pixiContainer.rotation = angle;
    }
    this._angle = angle
  }

  set pixiContainer(pixiContainer: Container) {
    this._pixiContainer = pixiContainer;
    this._pixiContainer.position.x = this._x
    this._pixiContainer.position.y = this._y
  }
}
