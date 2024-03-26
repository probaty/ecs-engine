import type { Sprite, Texture } from "pixi.js";
import { Component } from "@pixi-ecs/core";

export class SpriteComponent extends Component {
  private _spriteName: string
  private _sprite?: Sprite
  private _texture?: Texture
  public loaded = false
  constructor(spriteName: string) {
    super()
    this._spriteName = spriteName
  }

  get spriteName(): string {
    return this._spriteName
  }

  set sprite(sprite: Sprite) {
    this._sprite = sprite
  }

  get sprite(): Sprite | undefined {
    return this._sprite
  }

  set texture(texture: Texture) {
    this._texture = texture
  }

  get texture(): Texture | undefined {
    return this._texture
  }
}
