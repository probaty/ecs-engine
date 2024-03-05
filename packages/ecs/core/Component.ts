import type { Container } from "pixi.js";

export class Component {
  protected _pixiContainer: Container | null = null
  public id: string

  constructor() {
    this.id = crypto.randomUUID()
  }

  public set pixiContainer(cont: Container) {
    this._pixiContainer = cont;
  }
}

export type ComponentConstructor = new (...args: any[]) => Component;
