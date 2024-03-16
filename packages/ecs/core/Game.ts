import { Application, type IApplicationOptions } from "pixi.js";
import type { Addon } from "./Addon";
import { Scene } from "./Scene";
import Stats from "stats.js";

type Options = {};
export type GameOptions = Partial<Options> & Partial<IApplicationOptions>;
export type BasicGameState = {
  view: {
    width: number;
    height: number;
  };
  game: Game;
  tickers: Set<(dt: number) => void>
} & Record<string, unknown>;

const defaultOptions: GameOptions = {
  resizeTo: window,
  antialias: true,
  eventMode: "static",
};

export class Game extends Application {
  public gameState: BasicGameState;

  private _addons = new Set<Addon<unknown>>();
  private _scenes = new Map<string, Scene>()
  private _currentScene: Scene | null = null
  private _stats: Stats

  constructor(options?: GameOptions) {
    options = { ...defaultOptions, ...options };
    super(options);
    this._stats = new Stats()
    this._stats.showPanel(0)
    document.body.appendChild(this._stats.dom)

    document.body.appendChild(this.view as HTMLCanvasElement);
    this.gameState = {
      view: {
        width: this.view.width,
        height: this.view.height,
      },
      game: this,
      tickers: new Set()
    };
    //@ts-ignore
    globalThis.__PIXI_APP__ = this;
  }

  /**
   * run
   */
  public async run() {
    console.log(this.gameState);
    await Promise.all([...(this._addons.values())].map(val => val.loading))
    this._addons.forEach(addon => {
      addon.onCreate(this.gameState)
    })
    if (this._currentScene) {
      this.stage.addChild(this._currentScene.scene)
      this.ticker = this._currentScene.run(this.gameState, this._stats)
      this.gameState.tickers.forEach(t => {
        this.ticker.add(t)
      })
      this.ticker.add(this._stats.end)
      this.ticker.start()


    }
  }

  /**
   * addScene
   */
  public addScene(scene: Scene) {
    this._scenes.set(scene.name, scene)
    this._currentScene = scene
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
