import {Key} from 'ts-keycode-enum';

class UtilitiesHelper {

    private keys = {} as any;

    constructor() {
        window.onkeyup = (e: KeyboardEvent) => {
            this.keys[e.keyCode] = false;
        };
        window.onkeydown = (e: KeyboardEvent) => {
            this.keys[e.keyCode] = true;
        };

    }

    public IsKeyDown(key: Key): boolean {
        return this.keys[key];
    }

    public Clamp(num: number, gap1: number, gap2: number): number {
        let min = gap1;
        let max = gap2;

        if (gap1 > gap2) {
            min = gap2;
            max = gap2;
        }

        if (num < min) {
            return min;
        }
        if (num > max) {
            return max;
        }
        return num;
    }
}

export const Utilities = new UtilitiesHelper();
