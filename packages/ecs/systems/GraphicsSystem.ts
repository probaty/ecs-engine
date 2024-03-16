import { Graphics } from "pixi.js";
import { GraphicsComponent, type ShapeSize } from "../components/GraphicsComponent";
import { createSystem } from "../core/System";
import { SizeComponent } from "../components/SizeComponent";


export const GraphicsSystem = createSystem<[GraphicsComponent, SizeComponent]>([GraphicsComponent, SizeComponent], {
  onCreateEntity: (_, q) => {
    for (const [shape, size] of q) {
      console.log(shape);

      if (shape.mounted) continue
      const g = new Graphics()
      switch (shape.shape) {
        case "box": {
          let sizes = shape.sizes as ShapeSize<'box'>
          if (!sizes) {
            sizes = {
              width: size.width
            }
          }
          g.rect(0, 0, sizes.width, sizes.width)
          g.pivot.set(sizes.width / 2, sizes.width / 2)
          break
        }
        case "circle": {
          let sizes = shape.sizes as ShapeSize<'circle'>
          if (!sizes) {
            sizes = {
              radius: size.width
            }
          }
          g.circle(0, 0, sizes.radius / 2)
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
          g.rect(0, 0, sizes.width, sizes.height)
          g.pivot.set(sizes.width / 2, sizes.height / 2)
          break
        }
        default:
          break;
      }
      g.fill(0xDE3249)
      shape.pixiContainer.addChild(g)
      shape.mounted = true
    }
  }
})

