import { Container, Graphics, Assets, Sprite } from 'pixi.js'
import { Manager, IScene } from '../shared/Manager';
import { GameScene } from './GameScene';
import { manifest } from '../shared/manifest';
import { sound } from "@pixi/sound";

export class LoaderScene extends Container implements IScene {
    //private _loaderBackground: Sprite;
    private _loaderTitle: Sprite;
    private _loadingContainer: LoadingContainer;
    private _startButton?: Sprite;
    private _isLoaded: Boolean = false;

    constructor() {
        super();

        this.interactive = true;
        /*this._loaderBackground = Sprite.from("bg-texture-sea.png");
        this._loaderBackground.anchor.set(0.5);
        this._loaderBackground.x = (Manager.width) / 2;
        this._loaderBackground.y = (Manager.height) / 2;
        this.addChild(this._loaderBackground);*/

        this._loaderTitle = Sprite.from("Bug8bit.png");
        this._loaderTitle.anchor.set(0.5);
        this._loaderTitle.width = Math.max(Manager.width*0.2, 240);
        this._loaderTitle.height = Math.max(Manager.width*0.2, 240)/4;
        this._loaderTitle.x = Manager.width/2;
        this._loaderTitle.y = 100;
        this.addChild(this._loaderTitle);

        const loaderBarWidth = 280;
        this._loadingContainer = new LoadingContainer(loaderBarWidth);
        this.addChild(this._loadingContainer);
        this.initLoader().then(() => {
            this._isLoaded = true;
            this._startButton = Sprite.from("press-start.png");
            this._startButton.anchor.set(0.5);
            this._startButton.width = Math.max(Manager.width*0.2, 240);
            this._startButton.height = Math.max(Manager.width*0.2, 240)/4;
            this._startButton.x = (Manager.width) / 2;
            this._startButton.y = (Manager.height) / 2;
            if (this.removeChild(this._loadingContainer)) {
                this._loadingContainer.destroy();
                this.addChild(this._startButton);
            }
        });

        this.on("pointertap", () => {
            if (!this._isLoaded) return;
            this.loaded();
        });
    }

    async initLoader(): Promise<void> {
        await Assets.init({manifest: manifest});
        const bundlesIds = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loadingContainer.scaleProgress(progressRatio);
    }

    private loaded(): void {
        sound.play("benben");
        Manager.changeScene(new GameScene(Manager.width, Manager.height))
    }

    update(framesPassed: number): void {
        //...
    }

    resize(parentWidth: number, parentHeight: number): void {
        //...
        this._loaderTitle.width = Math.min(parentHeight, parentWidth) * 0.2;
        this._loaderTitle.height = Math.min(parentHeight, parentWidth) * 0.05;
        this._loaderTitle.x = Manager.width/2;
        this._loaderTitle.y = 70;
        //...
        //this._loaderBackground.x = parentWidth / 2;
        //this._loaderBackground.y = parentHeight / 2;
        //...
        if (this._startButton) {
            this._startButton.width = Math.max(Manager.width*0.2, 240);
            this._startButton.height = Math.max(Manager.width*0.2, 240)/4;
            this._startButton.x = parentWidth / 2;
            this._startButton.y = parentHeight / 2;
        }
    }
}


class LoadingContainer extends Container {
    private _loaderBar: Container;
    private _loaderBarBorder: Graphics;
    private _loaderProgress?: Graphics;
    private _barWidth: number;
    private _barHeight: number;

    constructor(barWidth: number) {
        super();
        this._barWidth = barWidth;
        this._barHeight = 48;

        this._loaderBarBorder = new Graphics();
        this._loaderBarBorder.lineStyle(4, 0x000000, 1);
        this._loaderBarBorder.drawRect(0, 0, this._barWidth + 6, this._barHeight);

        this._loaderBar = new Container();
        this._loaderBar.addChild(this._loaderBarBorder);
        this._loaderBar.position.x = (Manager.width - this._loaderBar.width) / 2;
        this._loaderBar.position.y = (Manager.height - this._loaderBar.height) / 2;
        this.addChild(this._loaderBar);
    }

    public scaleProgress(progress: number) {
        if (this._loaderProgress) {
            this._loaderBar.removeChild(this._loaderProgress);
            this._loaderProgress.destroy();
        }
        this._loaderProgress = this.makeRect(progress);
        this._loaderBar.addChild(this._loaderProgress);
    }

    resize(width: number, height: number) {
        this._loaderBar.position.x = (width - this._loaderBar.width) / 2;
        this._loaderBar.position.y = (height - this._loaderBar.height) / 2;
    }

    private makeRect(progress: number): Graphics {
        const percentLines = Math.floor((progress*100)/10);
        const padding = 6;
        const pieceWidth = this._barWidth/10 - padding;
        const rect = new Graphics();
        for (let i = 0; i < percentLines; ++i) {
            rect.beginFill(0xffff00 - i*0x001100, 1);
            rect.drawRect(
                padding*(i+1) + pieceWidth*i, 
                padding, 
                pieceWidth, 
                this._barHeight - 2*padding
            );
            rect.endFill();
        }
        return rect;
    }
}