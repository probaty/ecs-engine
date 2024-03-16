import type { Container } from "pixi.js";

export class Component {
  protected _pixiContainer!: Container
  public id: string

  constructor() {
    this.id = crypto.randomUUID()
  }

  public set pixiContainer(cont: Container) {
    this._pixiContainer = cont;
  }

  public get pixiContainer(): Container {
    return this._pixiContainer
  }
}

export type ComponentConstructor = new (...args: any[]) => Component;
