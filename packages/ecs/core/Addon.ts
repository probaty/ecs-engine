import type { BasicGameState } from "./Game";
import type { System } from "./System";

export abstract class Addon<GS = BasicGameState> {
  public loading = new Promise<void>((res) => res());
  protected _defaultSystems: System<any, any>[] = []
  public abstract name: string;
  public abstract onCreate(gameState: GS): void;
  public abstract onDestroy(gameState: GS): void;

  get defaultSystems(): System[] {
    return this._defaultSystems
  }
}
