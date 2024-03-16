import { Container } from "pixi.js";
import type { Component, ComponentConstructor } from "./Component";

export class Entity {
  public id: string;
  protected _components = new WeakMap<ComponentConstructor, Component>();
  private _pixiContainer: Container = new Container();
  constructor() {
    this.id = crypto.randomUUID();
  }

  public addComponent(component: Component) {
    component.pixiContainer = this._pixiContainer
    const compConstructor = component.constructor as ComponentConstructor;
    this._components.set(compConstructor, component);
  }


  /**
   * hasComponent
   */
  public hasComponent(component: ComponentConstructor) {
    return this._components.has(component);
  }
  /**
   * getComponent
   */
  public getComponent(component: ComponentConstructor) {
    return this._components.get(component);
  }
  public get pixiContainer(): Container {
    return this._pixiContainer;
  }
}
