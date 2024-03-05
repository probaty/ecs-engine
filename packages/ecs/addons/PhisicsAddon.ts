import { Addon } from "../core/Addon";
import type { BasicGameState } from "../core/Game";
import Box2DFactory from 'box2d-wasm'

export type B2BoxType = typeof Box2D & EmscriptenModule

export type PhisicsGS = {
  physics: {
    world: Box2D.b2World
    pixelsPerMeter: number
    b2box: B2BoxType;
  };
}

export type PhisicsOptions = {
  gravity?: { x: number, y: number },
  pixelsPerMeter?: number
}

type GS = BasicGameState & PhisicsGS;

const defaultOptions: Required<PhisicsOptions> = {
  gravity: { x: 0, y: 10 },
  pixelsPerMeter: 32
}

export class PhisicsAddon extends Addon<GS> {
  public name = "physics";
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
    this._gravity = options.gravity
    this._pixelsPerMeter = options.pixelsPerMeter
  }
  public onCreate(gameState: GS): void {
    const { b2World, b2Vec2 } = this._box2d
    gameState.physics.world = new b2World(new b2Vec2(this._gravity.x, this._gravity.y))
    gameState.tickers.add((dt: number) => {
      if (!dt || isNaN(dt)) dt = 1
      gameState.physics.world.Step(dt / 60, 3, 2)
    })
    gameState.physics.b2box = this._box2d
    gameState.physics.pixelsPerMeter = this._pixelsPerMeter

  }
  public onDestroy(gameState: GS): void {
    gameState.physics.world.__destroy__()
  }
}

