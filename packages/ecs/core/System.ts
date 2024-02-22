import type { Component } from "./Component"


export type Query<T> =  T[]

interface System<T, GS = any> {
  query: T
  update: (gameState: GS, query: Query<T>) => void
  onCreate?: (gameState: GS, query: Query<T>) => void
  onDestroy?: (gameState: GS, query: Query<T>) => void
}

export function createSystem<const T extends Component[] | Component, GS = any>(
  query: T,
  update: System<T, GS>['update'],
  {
    onCreate,
    onDestroy
  }: {
    onCreate?: System<T, GS>['onCreate']
    onDestroy?: System<T, GS>['onDestroy']
  } = {}
): System<T, GS> {
  return {
    query,
    update,
    onCreate,
    onDestroy
  }
}
