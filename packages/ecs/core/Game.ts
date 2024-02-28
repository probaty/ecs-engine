import { Application, type IApplicationOptions } from "pixi.js";
import type { Addon } from "./Addon";

type Options = {};
export type GameOptions = Partial<Options> & Partial<IApplicationOptions>;
export type BasicGameState = {
	view: {
		width: number;
		height: number;
	};
	game: Game;
} & Record<string, unknown>;

const defaultOptions: GameOptions = {
	resizeTo: window,
	antialias: true,
	eventMode: "static",
};

export class Game extends Application {
	public gameState: BasicGameState;

	private _addons = new Set<Addon<unknown>>();

	constructor(options?: GameOptions) {
		options = { ...defaultOptions, ...options };
		super(options);

		document.appendChild(this.view as HTMLCanvasElement);
		this.gameState = {
			view: {
				width: this.view.width,
				height: this.view.height,
			},
			game: this,
		};
	}

	/**
	 * registerAddons
	 */
	public registerAddons(addons: Addon<unknown>[]) {
		for (const addon of addons) {
			this.gameState[addon.name] = {};
			this._addons.add(addon);
		}
	}
}
