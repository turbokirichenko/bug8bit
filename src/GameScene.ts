import { Container, Sprite } from 'pixi.js';
import { IScene } from './Manager';
import { ActiveBug } from './ActiveBug';
import { Effect } from './units/Effect';

export class GameScene extends Container implements IScene {
    private _bugs: ActiveBug[];
    private _maxBugsLen: number = 12;
    private _effect?: Effect;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.interactive = true;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const background = Sprite.from("bg-grass");
                background.anchor.set(0);
                background.width = 240;
                background.height = 240;
                background.x = i*240;
                background.y = j*240;
                this.addChild(background);
            }
        }

        this._bugs = [];

        for(let i = 0; i < 6; ++i) {
            this.createBuggy(parentWidth, parentHeight);
        }

        this.on("pointertap", (e) => {
            const bugsLen = this._bugs.length;
            const randomNum = Math.random();
            const onExit = randomNum > (1 - bugsLen/this._maxBugsLen);
            if (onExit || bugsLen >= this._maxBugsLen) return;

            //create buggies
            const bugCount = 3 - Math.floor(3*randomNum);
            for (let i = 0; i < bugCount; ++i) {
                this.createBuggy(parentWidth, parentHeight);
            }

            //create effect
            const effect = new Effect("ouch");
            effect.position.copyFrom(e.global);
            if (this.addChild(effect)) {
                setTimeout(() => {
                    this.removeChild(effect);
                }, 500);
            }
        });
    }

    private createBuggy(width: number, height: number): Boolean {
        const buggy: ActiveBug = new ActiveBug(width, height);
        if (this.addChild(buggy)) {
            this._bugs.push(buggy);
            return true;
        }
        return false;
    }

    update(framesPassed: number): void {
        const buggyLen = this._bugs.length;
        for (let i = 0; i < buggyLen; ++i) {
            this._bugs[i].update(framesPassed);
            if (!this._bugs[i].alive) {
                if (this.removeChild(this._bugs[i])) {
                    this._bugs = this._bugs.filter(bug => bug.alive);
                    break;
                }
            }
        }
    }
}