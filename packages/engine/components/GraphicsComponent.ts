import { Graphics } from "pixi.js";
import { Component } from "@pixi-ecs/core";

type ShapeTypes = 'box' | 'circle' | 'rect'

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
type Shapes = {
  box: BoxShape,
  circle: CircleShape
  rect: RectShape
}

type ShapeComponentOptions<T extends ShapeTypes = ShapeTypes> =
  Shapes[T]


export type ShapeSize<T extends ShapeTypes> = Shapes[T]


export class GraphicsComponent<T extends ShapeTypes = ShapeTypes> extends Component {
  public shape: T
  public sizes?: Shapes[T]
  public mounted = false


  constructor(shape: T, options?: ShapeComponentOptions<T>) {
    super();
    this.shape = shape
    this.sizes = options
  }
}
