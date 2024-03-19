import type { Ticker } from "pixi.js";
import { Addon } from "../core/Addon";
import type { BasicGameState } from "../core/Game";
import Box2DFactory from 'box2d-wasm'

export type B2BoxType = typeof Box2D & EmscriptenModule

export type PhisicsGS = {
  physics: {
    world: Box2D.b2World
    pixelsPerMeter: number
    b2box: B2BoxType;
    options: Required<PhisicsOptions>
  };
}

export type PhisicsOptions = {
  gravity?: { x: number, y: number },
  pixelsPerMeter?: number,
  linierDamping?: number,
  angularDamping?: number,
  friction?: number,
  density?: number
}

type GS = BasicGameState & PhisicsGS;

const defaultOptions: Required<PhisicsOptions> = {
  gravity: { x: 0, y: 10 },
  pixelsPerMeter: 32,
  linierDamping: 5,
  angularDamping: 5,
  friction: 0.5,
  density: 1
}

export class PhisicsAddon extends Addon<GS> {
  public name = "physics";
  private _options: Required<PhisicsOptions>
  private _gravity
  private _pixelsPerMeter
  private _box2d!: B2BoxType
  constructor(partOptions?: PhisicsOptions) {
    super()
    const options = Object.assign({}, defaultOptions, partOptions)
    this.loading = new Promise(res => {
      Box2DFactory({ locateFile: url => url }).then(box => {
        this._box2d = box
        res()
      })
    })
    this._options = options
    this._gravity = options.gravity
    this._pixelsPerMeter = options.pixelsPerMeter
  }
  public onCreate(gameState: GS): void {
    const { b2World, b2Vec2 } = this._box2d
    gameState.physics.world = new b2World(new b2Vec2(this._gravity.x, this._gravity.y))
    gameState.tickers.add((dt: number) => {
      gameState.physics.world.Step(dt / 60, 3, 2)
    })
    gameState.physics.options = this._options
    gameState.physics.b2box = this._box2d
    gameState.physics.pixelsPerMeter = this._pixelsPerMeter

  }
  public onDestroy(gameState: GS): void {
    gameState.physics.world.__destroy__()
  }
}

