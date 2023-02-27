import { Container, Sprite } from "pixi.js";
import { IScene } from "../shared/Manager";
import { diffuseGroup, normalGroup, PointLight, AmbientLight, DirectionalLight } from "@pixi/lights";
import { Tween, Group, Interpolation } from "tweedle.js";
import { VectorArray2d } from "../shared/types";

export class BackgroundScene extends Container implements IScene {
    private _container: Container;
    private _light: PointLight;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this._container = this.createBackground(parentWidth, parentHeight);
        this.addChild(this._container);

        const light = new PointLight(0xffffff, 1.5);
        light.x = parentWidth/2;
        light.y = parentHeight/2;
        this._light = light;
        this.addChild(this._light);

        const pointsArray = this.createPoints(parentWidth, parentHeight);
        new Tween(light).to(pointsArray, 2000*Math.log(parentWidth*parentHeight))
            .repeat(Infinity)
            .interpolation(Interpolation.Geom.CatmullRom)
            .start();
    }

    update() {
        Group.shared.update();
    }

    resize(parentWidth: number, parentHeight: number) {
        this.removeChild(this._container);
        this._container.destroy();
        this._container = this.createBackground(parentWidth, parentHeight);
        this.addChild(this._container);

        this.removeChild(this._light);
        this._light.destroy();
        const light = new PointLight(0xffffff, 1.5);
        light.x = parentWidth/2;
        light.y = parentHeight/2;
        this._light = light;
        this.addChild(this._light);

        const pointsArray = this.createPoints(parentWidth, parentHeight);
        Group.shared.removeAll();
        new Tween(light).to(pointsArray, 2000*Math.log(parentWidth*parentHeight))
            .repeat(Infinity)
            .interpolation(Interpolation.Geom.CatmullRom)
            .start();
    }

    private createBackground (parentWidth: number, parentHeight: number): Container {
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

        const dirLight = new DirectionalLight(0xffffff, 0.5, this);
        dirLight.width = parentWidth;
        dirLight.height = parentHeight;
        dirLight.x = parentWidth / 2;
        dirLight.y = parentHeight / 2;
        const ambLight = new AmbientLight(0xffffff, 0.05);
        ambLight.width = parentWidth;
        ambLight.height = parentHeight;
        ambLight.x = parentWidth / 2;
        ambLight.y = parentHeight / 2;

        tempContainer.addChild(dirLight, ambLight);
        return tempContainer
    }

    private createPoints( parentWidth: number, parentHeight: number): VectorArray2d {
         // Create the point light
        const getArea = (num: number, width: number, range: number = 0.4): number => 
        width*(1 - range)/2 + width*num*range
        let pointsX = [];
        let pointsY = [];
        pointsX.push(parentWidth / 2);
        pointsY.push(parentHeight / 2);
        for(let i = 0; i<10; ++i) {
            const pointstampX = getArea(Math.random(), parentWidth);
            const pointstampY = getArea(Math.random(), parentHeight);

            pointsX.push(pointstampX);
            pointsY.push(pointstampY);
        }
        pointsX.push(parentWidth / 2);
        pointsY.push(parentHeight / 2);

        return { x: pointsX, y: pointsY };
    }
}