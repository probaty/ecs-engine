import { Graphics } from "pixi.js";
import { ShapeComponent, type ShapeSize } from "../components/ShapeComponent";
import { createSystem } from "../core/System";


export const GraphicsSystem = createSystem<ShapeComponent>(ShapeComponent, {
  onCreateEntity: (_, q) => {
    for (const shape of q) {
      console.log(shape);

      if (shape.mounted) continue
      const g = new Graphics()
      g.beginFill(0xDE3249)
      switch (shape.shape) {
        case "box": {
          const sizes = shape.sizes as ShapeSize<'box'>
          g.drawRect(0, 0, sizes.width, sizes.width)
          g.pivot.set(sizes.width / 2, sizes.width / 2)
          break
        }
        case "circle": {
          const sizes = shape.sizes as ShapeSize<'circle'>
          g.drawCircle(0, 0, sizes.radius / 2)
          break
        }
        case "rect": {
          const sizes = shape.sizes as ShapeSize<'rect'>
          g.drawRect(0, 0, sizes.width, sizes.height)
          g.pivot.set(sizes.width / 2, sizes.height / 2)
          break
        }
        case "line":


        default:
          break;
      }
      g.endFill()
      shape.pixiContainer.addChild(g)
      shape.mounted = true
    }
  }
})

