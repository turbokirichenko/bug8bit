import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/Manager';
import { UnitScene } from './UnitScene';
import { UserScene } from './UserScene';

export class GameScene extends Container implements IScene {
    private _unitScene: UnitScene;
    private _userScene: UserScene;

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this.drawBackground(parentWidth, parentHeight);
        this._unitScene = new UnitScene(parentWidth, parentHeight);
        this._userScene = new UserScene(parentWidth, parentHeight);
        this.addChild(this._unitScene);
        this.addChild(this._userScene);
    }

    update(framesPassed: number): void {
        this._unitScene.update(framesPassed);
        this._userScene.update(framesPassed);
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this.drawBackground(parentWidth, parentHeight);
        //
        this.removeChild(this._unitScene);
        this._unitScene.resize(parentWidth, parentHeight);
        this.addChild(this._unitScene);
        //
        this.removeChild(this._userScene);
        this._userScene.resize(parentWidth, parentHeight);
        this.addChild(this._userScene);
    }

    private drawBackground(parentWidth: number, parentHeight: number): void {
        const lineWidth = 120;
        for (let i = 0; i*lineWidth < parentWidth; i++) {
            for (let j = 0; j*lineWidth < parentHeight; j++) {
                const background = Sprite.from("bg-grass");
                background.anchor.set(0);
                background.width = lineWidth;
                background.height = lineWidth;
                background.x = i*lineWidth;
                background.y = j*lineWidth;
                this.addChild(background);
            }
        }
    }
}