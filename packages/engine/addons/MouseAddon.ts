import { Addon } from "@pixi-ecs/core";
import type { BasicGameState } from "@pixi-ecs/core";

export type MouseGS = {
  mouse: {
    position: {
      x: number;
      y: number;
    };
    pressed: {
      left: boolean;
      middle: boolean;
      right: boolean;
    };
  };
};

type GS = BasicGameState & MouseGS;

export class MouseAddon extends Addon<GS> {
  public name: string = "mouse";
  public onCreate(gameState: GS): void {
    gameState.mouse.position = {
      x: 0,
      y: 0,
    };
    gameState.mouse.pressed = {
      left: false,
      middle: false,
      right: false,
    };
    gameState.game.stage.eventMode = "static";
    gameState.game.stage.hitArea = gameState.game.screen;
    gameState.game.stage.on("pointermove", this.handlePointerMove.bind(this, gameState));
    gameState.game.stage.on("pointerdown", this.handlePointerDown.bind(this, gameState));
    gameState.game.stage.on("pointerup", this.handlePointerUp.bind(this, gameState));
  }

  public onDestroy(gameState: GS): void {
    gameState.game.stage.off("pointermove", this.handlePointerMove.bind(this, gameState));
    gameState.game.stage.off("pointerdown", this.handlePointerDown.bind(this, gameState));
    gameState.game.stage.off("pointerup", this.handlePointerUp.bind(this, gameState));
  }

  private handlePointerMove(gameState: GS, event: PointerEvent) {
    gameState.mouse.position = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  private handlePointerDown(gameState: GS, event: PointerEvent) {
    const button = this.getMouseButton(event.button);
    if (!button) {
      return;
    }
    gameState.mouse.pressed[button] = true;
  }

  private handlePointerUp(gameState: GS, event: PointerEvent) {
    const button = this.getMouseButton(event.button);
    if (!button) {
      return;
    }
    gameState.mouse.pressed[button] = false;
  }

  private getMouseButton(button: number): "left" | "middle" | "right" | undefined {
    switch (button) {
      case 0:
        return "left";
      case 1:
        return "middle";
      case 2:
        return "right";
    }
    return;
  }
}
