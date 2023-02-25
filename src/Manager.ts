import { Application, DisplayObject } from "pixi.js";

export class Manager {
    //class is almost will be static
    private constructor() {};
    private static _app: Application;
    private static _currentScene: IScene;

    private static _width: number;
    public static get width() {
        return Manager._width;
    }

    private static _height: number;
    public static get height() {
        return Manager._height;
    }


    public static init(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;
        Manager._app = new Application({
            view: document.getElementById("app__pixi") as HTMLCanvasElement,
	        resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width,
            height
        });

        Manager._app.ticker.add(Manager.update)

    }

    public static changeScene(newScene: IScene): void {
        if (Manager._currentScene) {
            Manager._app.stage.removeChild(Manager._currentScene);
            Manager._currentScene.destroy();
        }

        // Add the new one
        Manager._currentScene = newScene;
        Manager._app.stage.addChild(Manager._currentScene);
    }

    private static update(framesPassed: number): void {
        if (Manager._currentScene) {
            Manager._currentScene.update(framesPassed);
        }
    }
}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}