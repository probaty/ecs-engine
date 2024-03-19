import type { Container } from "pixi.js";
import { Component } from "../core/Component";
import type { IFollowOptions } from "pixi-viewport";

const defaultOptions: Required<IFollowOptions> = {
  speed: 0,
  radius: null,
  acceleration: null
}
class FollowComponent extends Component {
  private _options: IFollowOptions
  constructor(options?: IFollowOptions) {
    super()
    this._options = Object.assign({}, defaultOptions, options)
  }

  get zoomTarget(): Container {
    return this._pixiContainer
  }

  get options(): IFollowOptions {
    return this._options
  }
}

export { FollowComponent }
