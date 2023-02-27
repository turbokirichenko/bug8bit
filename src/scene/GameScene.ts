import { Container } from 'pixi.js';
import { IScene } from '../shared/Manager';
import { BackgroundScene } from './BackgroundScene';
import { UnitScene } from './UnitScene';
import { UserScene } from './UserScene';

export class GameScene extends Container implements IScene {
    private _background: BackgroundScene;
    private _unitScene: UnitScene;
    private _userScene: UserScene;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this._background = new BackgroundScene(parentWidth, parentHeight);
        this._unitScene = new UnitScene(parentWidth, parentHeight);
        this._userScene = new UserScene(parentWidth, parentHeight);
        this.addChild(this._background, this._unitScene, this._userScene);
    }

    update(framesPassed: number): void {
        this._background.update();
        this._unitScene.update(framesPassed);
        this._userScene.update(framesPassed);
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this.removeChild(this._background);
        this._background.resize(parentWidth, parentHeight);
        this.removeChild(this._unitScene);
        this._unitScene.resize(parentWidth, parentHeight);
        this.removeChild(this._userScene);
        this._userScene.resize(parentWidth, parentHeight);
        //
        this.addChild(this._background, this._unitScene, this._userScene);
    }
}