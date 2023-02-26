import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/Manager';
import { UnitScene } from './UnitScene';
import { UserScene } from './UserScene';
import { diffuseGroup, normalGroup, PointLight, DirectionalLight } from "@pixi/lights";

export class GameScene extends Container implements IScene {
    private _background: Container;
    private _unitScene: UnitScene;
    private _userScene: UserScene;

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this._background = this.drawBackground(parentWidth, parentHeight);
        this._unitScene = new UnitScene(parentWidth, parentHeight);
        this._userScene = new UserScene(parentWidth, parentHeight);
        this.addChild(this._background, this._unitScene, this._userScene);
    }

    update(framesPassed: number): void {
        this._unitScene.update(framesPassed);
        this._userScene.update(framesPassed);
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this.removeChild(this._background);
        this._background.destroy();
        this._background = this.drawBackground(parentWidth, parentHeight);
        this.removeChild(this._unitScene);
        this._unitScene.resize(parentWidth, parentHeight);
        this.removeChild(this._userScene);
        this._userScene.resize(parentWidth, parentHeight);
        //
        this.addChild(this._background, this._unitScene, this._userScene);
    }

    private drawBackground(parentWidth: number, parentHeight: number): Container {
        const lineWidth = 360;
        const tempContainer = new Container();
        for (let i = 0; i*lineWidth < parentWidth; i++) {
            for (let j = 0; j*lineWidth < parentHeight; j++) {
                const background = Sprite.from("bg-wood");
                background.parentGroup = diffuseGroup;
                background.anchor.set(0);
                background.width = lineWidth;
                background.height = lineWidth;
                background.x = i*lineWidth;
                background.y = j*lineWidth;

                const backgroundNormal = Sprite.from('bg-wood-normal');
                backgroundNormal.parentGroup = normalGroup;
                backgroundNormal.anchor.set(0);
                backgroundNormal.width = lineWidth;
                backgroundNormal.height = lineWidth;
                backgroundNormal.x = i*lineWidth;
                backgroundNormal.y = j*lineWidth;
                tempContainer.addChild(backgroundNormal, background);
            }
        }

        const dirLight = new DirectionalLight(0xffffff, 1, this);
        dirLight.width = parentWidth;
        dirLight.height = parentHeight;
        dirLight.x = parentWidth / 2;
        dirLight.y = parentHeight / 2;
        tempContainer.addChild(dirLight);

        // Create the point light
        const light = new PointLight(0xffffff, 1);
        light.x = parentWidth / 2;
        light.y = parentHeight / 2;
        tempContainer.addChild(light);

        return tempContainer;
    }
}