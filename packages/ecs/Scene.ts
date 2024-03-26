import { Container, Ticker } from "pixi.js";
import type { System } from "./System";
import type { BasicGameState } from "./App";
import { Component, type ComponentConstructor } from "./Component";
import type { Entity } from "./Entity";

export const enum SystemType {
  UPDATE = "update",
  ON_CREATE = "onCreate",
  ON_DESTROY = "onDestroy",
  ON_CREATE_ENTITY = 'onCreateEntity',
}

const systemMapTemplate: [SystemType, System[]][] = [
  [SystemType.UPDATE, []],
  [SystemType.ON_CREATE, []],
  [SystemType.ON_DESTROY, []],
  [SystemType.ON_CREATE_ENTITY, []],
];

type ComponentQuery = (Component[] | Component)[];

export class Scene {
  public name: string;
  private _systems = new Map<SystemType, System[]>(systemMapTemplate);
  private _mappedSystems = new WeakMap<System, ComponentQuery>();
  private _entities = new Set<Entity>();
  private _gameState?: BasicGameState;
  private _scene: Container = new Container();
  public ticker = new Ticker()

  constructor(name: string) {
    this.name = name;
  }

  /**
   * run
   */
  public run(gs: BasicGameState, stats?: any) {
    this._gameState = gs
    this.ticker.autoStart = false
    this.ticker.stop()
    if (stats) {
      this.ticker.add(stats.begin)
    }
    this.ticker.addOnce(() => {
      this.onCreate(gs)
      this.onCreateEntity(gs)
    })
    this.ticker.add((dt) => {
      this.update(dt / 60, gs)
    })
    return this.ticker
  }

  /**
   * addEntity
   */
  public addEntity(entity: Entity | Entity[]) {
    if (Array.isArray(entity)) {
      for (const ent of entity) {
        this._entities.add(ent)
        this._scene.addChild(ent.pixiContainer)
      }
    } else {
      this._entities.add(entity);
      this._scene.addChild(entity.pixiContainer)
    }
    this.createSystemMap();
    if (this.ticker.started && this._gameState) {
      this.ticker.addOnce(() => {
        this.onCreateEntity(this._gameState)
      })
    }
  }

  public addSystem(system: System<any>[], order: 1 | -1 = 1) {
    for (const type of [SystemType.UPDATE, SystemType.ON_CREATE, SystemType.ON_DESTROY, SystemType.ON_CREATE_ENTITY]) {
      const systemsList = this._systems.get(type);
      if (!systemsList) {
        throw new Error(`System ${type} not found`);
      }
      if (order === 1) {
        systemsList.push(...system);
      } else {
        systemsList.unshift(...system);
      }
    }
    this.createSystemMap();
    if (this.ticker.started && this._gameState) {
      this.ticker.addOnce(() => {
        this.onCreateEntity(this._gameState)
        this.onCreate(this._gameState)
      })
    }
  }

  /**
   * update
   */
  public update(delta: number, gameState: any) {
    this._systems.get(SystemType.UPDATE)!.forEach((system) => {
      const components = this._mappedSystems.get(system);
      if (components && system?.update) {
        system.update(gameState, components, delta);
      }
    });
  }

  /**
   * onCreate
   */
  public onCreate(gameState: any) {
    this._systems.get(SystemType.ON_CREATE)!.forEach((system) => {
      const components = this._mappedSystems.get(system);
      if (components && system?.onCreate) {
        system.onCreate(gameState, components);
      }
    });
  }


  /**
   * onCreateEntity
   */
  public onCreateEntity(gameState: any) {
    this._systems.get(SystemType.ON_CREATE_ENTITY)!.forEach((system) => {
      const components = this._mappedSystems.get(system);
      if (components && system?.onCreateEntity) {
        system.onCreateEntity(gameState, components);
      }
    });
  }

  /**
   * onDestroy
   */
  public onDestroy(gameState: any) {
    this._systems.get(SystemType.ON_DESTROY)!.forEach((system) => {
      const components = this._mappedSystems.get(system);
      if (components && system?.onDestroy) {
        system.onDestroy(gameState, components);
      }
    });
  }


  private createSystemMap() {
    this._systems.forEach((systems) => {
      console.log(systems);

      systems.forEach((system) => {
        this._mappedSystems.set(system, this.findEntityByQuery.call(this, system.query));
      });
    });
  }

  private findEntityByQuery(query: ComponentConstructor[] | ComponentConstructor): ComponentQuery {
    const entities: ComponentQuery = [];
    this._entities.forEach((entity) => {
      if (Array.isArray(query)) {
        const tempComponents: Component[] = [];
        let all = true
        for (const comp of query) {
          if (entity.hasComponent(comp)) {
            const componentValue = entity.getComponent(comp)
            if (!componentValue) {
              all = false
              break
            }
            tempComponents.push(componentValue)
            continue
          }
          all = false
          break
        }
        if (all) {
          entities.push([...tempComponents]);
        }
      } else {
        if (entity.hasComponent(query)) {
          const componentValue = entity.getComponent(query)
          if (componentValue) {
            entities.push(componentValue);
          }
        }
      }
    });
    return entities;
  }

  public get scene(): Container {
    return this._scene;
  }
}
