import { Addon } from "../core/Addon";

const keyboardMap: Record<string, string> = {
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
};

export class KeyboardAddon<GS extends Record<string, any>> extends Addon<GS> {
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
		const key = keyboardMap[event.code];
		if (key) {
			gameState.keyboard[key] = true;
			const dir = getDirection(key);
			if (dir) {
				gameState.keyboard.direction[dir] = true;
			}
		} else {
			gameState.keyboard.otherKeys[formatKeyCode(event.code)] = true;
		}
	}

	private _handleKeyUp(gameState: GS, event: KeyboardEvent) {
		const key = keyboardMap[event.code];
		if (key) {
			gameState.keyboard[key] = false;
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
