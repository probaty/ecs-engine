import { Application, Container, Assets, type IApplicationOptions, type TickerCallback, Sprite, Graphics } from "pixi.js";
import type { Addon } from "./Addon";
import { Scene } from "./Scene";
import DefautSystems from "./DefaultSystems";
import Stats from "stats.js";
import type { Viewport } from "pixi-viewport";
import type { System } from "./System";
import { GraphicsSystem, SpriteSystem } from "../systems";

type Options = {};
export type GameOptions = Partial<Options> & Partial<IApplicationOptions>;
export type BasicGameState = {
  view: {
    width: number;
    height: number;
  };
  game: Game;
  state: {
    gameStarted: boolean
    currentScene: Scene | null
  }
  tickers: Set<TickerCallback<unknown>>
} & Record<string, unknown>;

const defaultOptions: GameOptions = {
  resizeTo: window,
  antialias: true,
  eventMode: "static",
};

type AssetType = { alias: string, src: string }

type PreloadAsset = AssetType | AssetType[] | Record<string, string>

export class Game extends Application {
  public gameState!: BasicGameState;

  private _addons = new Set<Addon<unknown>>();
  private _scenes = new Map<string, Scene>()
  private _assetPreload: AssetType[] = []
  private _currentScene: Scene | null = null
  private _stats!: Stats
  private _options: GameOptions
  private _rootStage: Container | Viewport = new Container()
  private _coreSystems: System<any, any>[] = [SpriteSystem, GraphicsSystem]

  constructor(options?: GameOptions) {
    const _options = { ...defaultOptions, ...options };
    super(_options);
    this._options = _options

    this._stats = new Stats()
    this._stats.showPanel(0)
    document.body.appendChild(this._stats.dom)
    document.body.appendChild(this.view as HTMLCanvasElement);
    this.gameState = {
      game: this,
      tickers: new Set(),
      view: {
        width: this.view.width,
        height: this.view.height,
      },
      state: {
        gameStarted: false,
        currentScene: null
      }
    };
  }

  /**
   * run
   */
  public async run() {
    await Promise.all([...(this._addons.values())].map(val => val.loading))
    await this.loadAssets()
    this._addons.forEach(addon => {
      addon.onCreate(this.gameState)
    })
    if (this._currentScene) {
      this._rootStage.addChild(this._currentScene.scene)
      this.stage.addChild(this._rootStage)
      this.ticker = this._currentScene.run(this.gameState, this._stats)
      this.gameState.tickers.forEach(t => {
        this.ticker.add(t)
      })
      this.ticker.add(this._stats.end)
      this.gameState.state.gameStarted = true
      this.ticker.start()
    }
  }


  /**
   * addAssetPreload
   */
  public addAssets(assets: PreloadAsset) {
    if (Array.isArray(assets)) {
      this._assetPreload.push(...assets)
    } else if ('alias' in assets && 'src' in assets) {
      this._assetPreload.push({ alias: assets.alias, src: assets.src })
    } else if (typeof assets === 'object') {
      for (const alias in assets) {
        const src = assets[alias]
        this._assetPreload.push({ alias, src })
      }
    }
    this._addAssetsToLoader()
  }

  private _addAssetsToLoader() {
    for (const asset of this._assetPreload) {
      Assets.add(asset)
    }
  }


  /**
   * loadAssets
   */
  public async loadAssets() {
    const keys = this._assetPreload.map(a => a.alias)
    if (keys.length === 0) {
      return
    }
    await Assets.load(keys)
  }

  /**
   * addScene
   */
  public addScene(scene: Scene) {
    this._scenes.set(scene.name, scene)
    this._currentScene = scene
    this._currentScene.addSystem(this._coreSystems, -1)
    this.gameState.state.currentScene = scene
  }

  /**
   * registerAddons
   */
  public registerAddons(addons: Addon<unknown>[]) {
    for (const addon of addons) {
      this.gameState[addon.name] = {};
      this._coreSystems.push(...addon.defaultSystems)
      this._addons.add(addon);
    }
  }

  public set rootStage(stage: Container | Viewport) {
    this._rootStage = stage;
  }

  public set coreSystems(v: System[]) {
    this._coreSystems = v;
  }

  public get coreSystems(): System[] {
    return this._coreSystems
  }
}
