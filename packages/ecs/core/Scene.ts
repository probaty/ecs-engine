import { Container } from "pixi.js";
import type { System } from "./System";
import type { Game } from "./Game";
import type { PixiEntity } from "./PixiEntity";
import type { Entity } from "./Entity";
import type { EntityType } from "../types/EntityType";
import type { Component } from "./Component";

export const enum SystemType {
	UPDATE = "update",
	ON_CREATE = "onCreate",
	ON_DESTROY = "onDestroy",
}

const systemMapTemplate: [SystemType, System[]][] = [
	[SystemType.UPDATE, []],
	[SystemType.ON_CREATE, []],
	[SystemType.ON_DESTROY, []],
];

type ComponentQuery = (Component[] | Component)[];

export class Scene {
	private _systems = new Map<SystemType, System[]>(systemMapTemplate);
	private _mappedSystems = new WeakMap<System, ComponentQuery>();
	private _entities = new Set<EntityType>();
	public name: string;
	private _scene: Container = new Container();

	constructor(name: string) {
		this.name = name;
	}

	/**
	 * addEntity
	 */
	public addEntity(entity: EntityType) {
		this._entities.add(entity);
		this.createSystemMap();
	}

	public addSystem(system: System, type: SystemType = SystemType.UPDATE) {
		const systemsList = this._systems.get(type);
		if (!systemsList) {
			throw new Error(`System ${type} not found`);
		}
		systemsList.push(system);
		this.createSystemMap();
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
			if (components && system?.update) {
				system.update(gameState, components);
			}
		});
	}

	/**
	 * onDestroy
	 */
	public onDestroy(gameState: any) {
		this._systems.get(SystemType.ON_DESTROY)!.forEach((system) => {
			const components = this._mappedSystems.get(system);
			if (components && system?.update) {
				system.update(gameState, components);
			}
		});
	}

	private createSystemMap() {
		this._systems.forEach((systems) => {
			systems.forEach((system) => {
				this._mappedSystems.set(system, this.findEntityByQuery.call(this, system.query));
			});
		});
	}

	private findEntityByQuery(query: Component[] | Component): ComponentQuery {
		const entities: ComponentQuery = [];
		this._entities.forEach((entity) => {
			if (Array.isArray(query)) {
				const tempComponents: Component[] = [];
				if (query.every((q) => entity.hasComponent(q) && tempComponents.push(q))) {
					entities.push([...tempComponents]);
				}
			} else {
				if (entity.hasComponent(query)) {
					entities.push(entity);
				}
			}
		});
		return entities;
	}

	public get scene(): Container {
		return this._scene;
	}
}
