import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class PositionComponent extends Component {
  private _pixiContainer?: Container
  private _x = 0
  private _y = 0

  constructor(params: {x?: number, y?: number, pixiContainer?: Container}) {
    super()
    if (params.x !== undefined) {
      this._x = params.x
    }
    if (params.y !== undefined) {
      this._y = params.y
    }
    if (params.pixiContainer) {
      this._pixiContainer = params.pixiContainer
    }
    if (this._pixiContainer) {
      this._pixiContainer.position.set(this._x, this._y)
    }
  }


  public get x() : number {
    if (this._pixiContainer) {
      return this._pixiContainer.x
    }
    return this._x
  }

  public get y() : number {
    if (this._pixiContainer) {
      return this._pixiContainer.y
    }
    return this._y
  }

  public set x(x: number) {
    if (this._pixiContainer) {
      this._pixiContainer.x = x
    }
    this._x = x
  }

  public set y(y: number) {
    if (this._pixiContainer) {
      this._pixiContainer.y = y
    }
    this._y = y
  }
}
