import { Graphics } from "pixi.js";
import { GraphicsComponent, type ShapeSize } from "../components/GraphicsComponent";
import { createSystem } from "../core/System";
import { SizeComponent } from "../components/SizeComponent";


export const GraphicsSystem = createSystem<[GraphicsComponent, SizeComponent]>([GraphicsComponent, SizeComponent], {
  onCreateEntity: (_, q) => {
    for (const [shape, size] of q) {
      if (shape.mounted) continue
      const g = new Graphics()
      g.beginFill(0xDE3249)
      switch (shape.shape) {
        case "box": {
          let sizes = shape.sizes as ShapeSize<'box'>
          if (!sizes) {
            sizes = {
              width: size.width
            }
          }
          g.drawRect(0, 0, sizes.width, sizes.width)
          break
        }
        case "circle": {
          let sizes = shape.sizes as ShapeSize<'circle'>
          if (!sizes) {
            sizes = {
              radius: size.width
            }
          }
          g.drawCircle(sizes.radius / 2, sizes.radius / 2, sizes.radius / 2)
          break
        }
        case "rect": {
          let sizes = shape.sizes as ShapeSize<'rect'>
          if (!sizes) {
            sizes = {
              width: size.width,
              height: size.height
            }
          }
          g.drawRect(0, 0, sizes.width, sizes.height)
          break
        }
        default:
          break;
      }
      g.endFill()
      shape.pixiContainer.addChild(g)
      shape.mounted = true
    }
  }
})

