import { Application, type IApplicationOptions } from "pixi.js";

type Options = {};
type GameOptions = Partial<Options> & Partial<IApplicationOptions>;
export class Game extends Application {
	constructor(options?: GameOptions) {
		super(options);

		document.appendChild(this.view as HTMLCanvasElement);
	}
}
