import type { CameraGS } from "../addons/CameraAddon"
import { FollowComponent } from "../components"
import { createSystem } from "@pixi-ecs/core"

export const FollowCameraSystem = createSystem<FollowComponent, CameraGS>(FollowComponent, {
  onCreateEntity(gameState, query) {
    for (const foll of query) {
      const component = foll.zoomTarget
      gameState.camera.viewport.follow(component, foll.options)
    }
  },
})


