import { Graphics } from "pixi.js";
import { Component } from "../core/Component";

type ShapeTypes = 'box' | 'circle' | 'rect' | 'line'

type CircleShape = {
  radius: number
}
type BoxShape = {
  width: number
}
type RectShape = {
  width: number
  height: number
}
type LineShape = {
  width: number
}
type Shapes = {
  box: BoxShape,
  circle: CircleShape
  rect: RectShape
  line: LineShape
}

type ShapeComponentOptions<T extends ShapeTypes = ShapeTypes> = {
  sizes: Shapes[T]
}

export type ShapeSize<T extends ShapeTypes> = Shapes[T]


export class ShapeComponent<T extends ShapeTypes = ShapeTypes> extends Component {
  public shape: T
  public sizes: Shapes[T]
  public mounted = false


  constructor(shape: T, options: ShapeComponentOptions<T>) {
    super();
    this.shape = shape
    this.sizes = options.sizes
  }
}
