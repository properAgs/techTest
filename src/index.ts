import './index.scss';
import './header/header';
import './footer/footer';

import {Application, loader} from 'pixi.js';
import {Key} from 'ts-keycode-enum';
import {Character} from "./app/character";
import {Utilities} from "./app/Utilities";

class Game {
    private app: Application;

    constructor() {
        // instantiate app
        this.app = new Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb // light blue
        });

        // create view in DOM
        document.body.appendChild(this.app.view);

        // preload needed assets
        loader.add('samir', '/assets/img/hero.png');

        // then launch app
        loader.load(this.setup.bind(this));
    }

    setup(): void {
        // append hero
        const hero = new Character(loader.resources['samir'].texture);
        const heroSprite = hero.sprite;
        this.app.stage.addChild(heroSprite);

        const width = this.app.view.width;
        const height = this.app.view.height;

        heroSprite.x = width / 2;
        heroSprite.y = height / 2;
        const ticker = this.app.ticker
        ticker.add(() => {
            const speed = 5 * ticker.deltaTime;
            if (Utilities.IsKeyDown((Key.DownArrow))) {
                heroSprite.y += speed;
            }
            if (Utilities.IsKeyDown((Key.UpArrow))) {
                heroSprite.y -= speed;
            }
            if (Utilities.IsKeyDown((Key.RightArrow))) {
                heroSprite.x += speed;
            }
            if (Utilities.IsKeyDown((Key.LeftArrow))) {
                heroSprite.x -= speed;
            }

            const xGap = heroSprite.width / 2;
            const yGap = heroSprite.height / 2;
            heroSprite.x = Utilities.Clamp(heroSprite.x, xGap, width - xGap);
            heroSprite.y = Utilities.Clamp(heroSprite.y, yGap, height - yGap);
        });
    }
}

window.onload = () => new Game();
