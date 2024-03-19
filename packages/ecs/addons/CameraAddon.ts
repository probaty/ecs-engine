import { Viewport } from "pixi-viewport";
import { Addon } from "../core/Addon";
import type { BasicGameState } from "../core/Game";
import { FollowCameraSystem } from "../systems";

export type CameraGS = {
  camera: {
    viewport: Viewport;
  };
};

type GS = BasicGameState & CameraGS;

class CameraAddon extends Addon<GS> {
  public name: string = "camera";
  constructor() {
    super()
    this._defaultSystems = [FollowCameraSystem]
  }
  public onCreate(gameState: GS): void {
    const viewport = new Viewport({
      worldWidth: 1000,
      worldHeight: 1000,
      events: gameState.game.renderer.events,
    });
    gameState.camera.viewport = viewport;
    gameState.game.rootStage = viewport
  }
  public onDestroy(gameState: GS): void {
    gameState.camera.viewport.destroy()
  }

}

export { CameraAddon }
