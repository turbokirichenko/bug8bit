import { Application, DisplayObject } from "pixi.js";

export class Manager {
    //class is almost will be static
    private constructor() {};
    private static _app: Application;
    private static _currentScene: IScene;

    public static get width() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    public static get height() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    public static init(background: number): void {
        Manager._app = new Application({
            view: document.getElementById("app__pixi") as HTMLCanvasElement,
            resizeTo: window,
	        resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
        });

        Manager._app.ticker.add(Manager.update);
        window.addEventListener("resize", Manager.resize);
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

    public static resize(): void {
        // if we have a scene, we let it know that a resize happened!
        if (Manager._currentScene) {
            Manager._currentScene.resize(Manager.width, Manager.height);
        }
    }
}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    // we added the resize method to the interface
    resize(screenWidth: number, screenHeight: number): void;
}