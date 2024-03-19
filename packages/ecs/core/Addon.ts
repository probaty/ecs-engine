import type { BasicGameState } from "./Game";

export abstract class Addon<GS = BasicGameState> {
	public loading = new Promise<void>((res) => res());
	public abstract name: string;
	public abstract onCreate(gameState: GS): void;
	public abstract onDestroy(gameState: GS): void;
}
