import type { Component, ComponentConstructor } from "./Component";
import type { BasicGameState } from "./Game";

export type Query<T> = T[];

type CombineGS<T extends Record<string, any>> = BasicGameState & T

export interface System<T = Component | Component[], GS = any> {
  query: ComponentConstructor | ComponentConstructor[];
  update?: (gameState: GS, query: Query<T>, delta: number) => void;
  onCreate?: (gameState: GS, query: Query<T>) => void;
  onCreateEntity?: (gameState: GS, query: Query<T>) => void;
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

export type onCreateEntityFunction<T = Component | Component[], GS = any> = (
  gameState: GS,
  query: Query<T>,
) => void;

export type onDestroyFunction<T = Component | Component[], GS = any> = (
  gameState: GS,
  query: Query<T>,
) => void;

export function createSystem<
  const T extends Component[] | Component,
  GS extends Record<string, any> = {},
>(query: ComponentConstructor | ComponentConstructor[], { onCreate, onDestroy, onCreateEntity, update }: Omit<System<T, CombineGS<GS>>, "query"> = {}): System<T, CombineGS<GS>> {

  return {
    query,
    update,
    onCreate,
    onDestroy,
    onCreateEntity,
  };
}

