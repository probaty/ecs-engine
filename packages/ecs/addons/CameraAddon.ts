import { Viewport } from "pixi-viewport";
import { Addon } from "../core/Addon";
import type { BasicGameState } from "../core/Game";
import { Container } from "pixi.js";

export type CameraGS = {
  camera: {
    viewport: Viewport;
  };
};

type GS = BasicGameState & CameraGS;

export class CameraAddon extends Addon<GS> {
  public name: string = "camera";
  public onCreate(gameState: GS): void {
    const viewport = new Viewport({
      worldWidth: 1000,
      worldHeight: 1000,
      //@ts-ignore
      events: gameState.game.renderer.events,
    });
    gameState.camera.viewport = viewport;
    gameState.game.rootStage = viewport
  }
  public onDestroy(gameState: GS): void {
    gameState.camera.viewport.destroy()
  }

}
