import type { Container } from "pixi.js";
import { Component } from "../core/Component";

export class RotateComponent extends Component {
  private _rotate = 0;

  constructor(params?: { rotate?: number }) {
    super();
    if (!params) return
    if (params.rotate !== undefined) {
      this._rotate = params.rotate;
    }
  }

  public get rotate(): number {
    return this._rotate;
  }

  public set rotate(rotate: number) {
    if (this._pixiContainer) {
      this._pixiContainer.rotation = rotate;
    }
    this._rotate = rotate;
  }

  set pixiContainer(pixiContainer: Container) {
    this._pixiContainer = pixiContainer;
    this._pixiContainer.rotation = this._rotate
  }
}
