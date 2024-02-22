import type { Component, ComponentConstructor } from "./Component";

export class Entity {
  private _components = new WeakMap<ComponentConstructor, Component>();
  public id: string;
  constructor() {
    this.id = crypto.randomUUID();
  }

  /**
   * addComponent
   */
  public addComponent(component: Component) {
    const compConstructor = component.constructor as ComponentConstructor
    this._components.set(compConstructor, component)
  }

  /**
   * getComponent
   */
  public getComponent(component: Component) {
    const compConstructor = component.constructor as ComponentConstructor
    return this._components.get(compConstructor)
  }

  /**
   * hasComponent
   */
  public hasComponent(component: Component) {
    const compConstructor = component.constructor as ComponentConstructor
    return this._components.has(compConstructor)
  }

}
