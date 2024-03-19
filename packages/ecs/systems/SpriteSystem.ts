import { Assets, Sprite, Texture } from "pixi.js";
import { SpriteComponent } from "../components/SpriteComponent";
import { createSystem } from "../core/System";
import { SizeComponent } from "../components/SizeComponent";



export const SpriteSystem = createSystem<[SpriteComponent, SizeComponent]>([SpriteComponent, SizeComponent], {
  onCreateEntity(gameState, query) {
    for (const [spriteComp, size] of query) {
      if (!spriteComp.texture && !spriteComp.loaded) {
        spriteComp.texture = Assets.get<Texture>(spriteComp.spriteName)
      }
      if (!spriteComp.loaded) {
        const spriteObject = new Sprite(spriteComp.texture)
        spriteObject.width = size.width
        spriteObject.height = size.height
        spriteComp.sprite = spriteObject
        spriteComp.loaded = true

        spriteComp.pixiContainer.addChild(spriteComp.sprite)
      }
    }
  },
})
