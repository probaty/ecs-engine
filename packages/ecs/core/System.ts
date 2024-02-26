import type { Component } from "./Component";

export type Query<T> = T[];

export interface System<T = Component | Component[], GS = any> {
	query: T;
	update?: (gameState: GS, query: Query<T>, delta?: number) => void;
	onCreate?: (gameState: GS, query: Query<T>) => void;
	onDestroy?: (gameState: GS, query: Query<T>) => void;
}

export type updateFunction<T = Component | Component[], GS = any> = (
	gameState: GS,
	query: Query<T>,
) => void;

export type onCreateFunction<T = Component | Component[], GS = any> = (
	gameState: GS,
	query: Query<T>,
) => void;

export type onDestroyFunction<T = Component | Component[], GS = any> = (
	gameState: GS,
	query: Query<T>,
) => void;

export function createSystem<
	const T extends Component[] | Component = Component | Component[],
	GS = any,
>(query: T, { onCreate, onDestroy, update }: Omit<System<T, GS>, "query"> = {}): System<T, GS> {
	return {
		query,
		update,
		onCreate,
		onDestroy,
	};
}
