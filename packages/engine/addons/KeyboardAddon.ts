import { Addon } from "@pixi-ecs/core";
import type { BasicGameState } from "@pixi-ecs/core";

const keyboardMap = {
  KeyA: "a",
  KeyD: "d",
  KeyW: "w",
  KeyS: "s",
  Space: "space",
  Enter: "enter",
  Escape: "escape",
  ArrowRight: "right",
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowDown: "down",
} as const;

export type KeyboardGS = {
  keyboard: {
    keys: Partial<Record<typeof keyboardMap[keyof typeof keyboardMap], boolean>>;
    otherKeys: Record<string, boolean>;
    direction: {
      up: boolean;
      down: boolean;
      left: boolean;
      right: boolean;
    };
  };
};

type GS = BasicGameState & KeyboardGS;

export class KeyboardAddon extends Addon<GS> {
  public name: string = "keyboard";
  public onCreate(gameState: GS): void {
    gameState.keyboard.keys = {};
    gameState.keyboard.otherKeys = {};
    gameState.keyboard.direction = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    document.addEventListener("keydown", this._handleKeyDown.bind(this, gameState));
    document.addEventListener("keyup", this._handleKeyUp.bind(this, gameState));
  }

  public onDestroy(gameState: GS): void {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this, gameState));
    document.removeEventListener("keyup", this._handleKeyUp.bind(this, gameState));
  }

  private _handleKeyDown(gameState: GS, event: KeyboardEvent) {
    const key = keyboardMap[event.code as keyof typeof keyboardMap];
    if (key) {
      gameState.keyboard.keys[key] = true;
      const dir = getDirection(key);
      if (dir) {
        gameState.keyboard.direction[dir] = true;
      }
    } else {
      gameState.keyboard.otherKeys[formatKeyCode(event.code)] = true;
    }
  }

  private _handleKeyUp(gameState: GS, event: KeyboardEvent) {
    const key = keyboardMap[event.code as keyof typeof keyboardMap];
    if (key) {
      gameState.keyboard.keys[key] = false;
      const dir = getDirection(key);
      if (dir) {
        gameState.keyboard.direction[dir] = false;
      }
    } else {
      gameState.keyboard.otherKeys[formatKeyCode(event.code)] = false;
    }
  }
}

function formatKeyCode(key: string) {
  return key.replace("Key", "").toLowerCase();
}

function getDirection(key: string) {
  if (key === "w" || key === "ArrowUp") {
    return "up";
  } else if (key === "s" || key === "ArrowDown") {
    return "down";
  } else if (key === "a" || key === "ArrowLeft") {
    return "left";
  } else if (key === "d" || key === "ArrowRight") {
    return "right";
  }
}
