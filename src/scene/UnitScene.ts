import { Container } from "pixi.js";
import { BugScene } from "./BugScene";
import { IScene } from "../shared/Manager";
import { Effect } from "../units/Effect";

export class UnitScene extends Container implements IScene {

    private _bugs: BugScene[];
    private _maxBugsLen: number = 12;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.interactive = true;

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

    update(framesPassed: number) {
        //detect collision
        const buggyLen = this._bugs.length;
        const bugs = this._bugs.filter(bug => bug);
        for (let i = 0; i < buggyLen; ++i) {
            for (let j = i + 1; j < buggyLen; ++j) {
                if (bugs[i].detectCollusion(bugs[j].x, bugs[j].y, 32)) {
                    bugs[i].changeDirection();
                    bugs[j].changeDirection();
                    break;
                }
            }
        }

        //delete destroyed
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

    resize(parentWidth: number, parentHeight: number) {
        console.log(parentWidth, parentHeight);
        //
        let len = this._bugs.length;
        for (let i = 0; i < len; ++i) {
            if (this.removeChild(this._bugs[i])) {
                this._bugs[i].resize(parentWidth, parentHeight);
                this.addChild(this._bugs[i]);
            }
        }
    }

    private createBuggy(width: number, height: number): Boolean {
        const buggy: BugScene = new BugScene(width, height);
        if (this.addChild(buggy)) {
            this._bugs.push(buggy);
            return true;
        }
        return false;
    }
}