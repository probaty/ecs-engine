import type { B2BoxType } from "../addons/PhisicsAddon";
import { Component } from "../core/Component";


type RigbodyComponentArgs = {
  shape: 'line' | 'circle' | 'rect',
  type: 'dynamic' | 'static' | 'kinematic',
  width?: number,
  height?: number,
}

const defaultOptions: RigbodyComponentArgs = {
  shape: 'rect',
  type: 'static'
}

export class RigbodyComponent extends Component {
  public body!: Box2D.b2Body
  public options: RigbodyComponentArgs
  constructor(partOptions: Partial<RigbodyComponentArgs>) {
    super()
    this.options = Object.assign({}, defaultOptions, partOptions)
  }
}
