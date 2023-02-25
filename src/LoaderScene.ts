import { Container, Graphics, Assets, Sprite } from 'pixi.js'
import { Manager, IScene } from './Manager';
import { GameScene } from './GameScene';
import { manifest } from './shared/manifest';

export class LoaderScene extends Container implements IScene {
    private _loaderBackground?: Sprite;
    private _loaderBar: Container;
    private _loaderBarBorder: Graphics;
    private _loaderBarFill: Graphics;

    constructor() {
        super();

        this._loaderBackground = Sprite.from("bg-texture-sea.png");
        this._loaderBackground.anchor.set(0.5);
        this.addChild(this._loaderBackground);

        const loaderBarWidth = Manager.width * 0.8;

        this._loaderBarFill = new Graphics();
        this._loaderBarFill.beginFill(0x008800, 1)
        this._loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this._loaderBarFill.endFill();
        this._loaderBarFill.scale.x = 0;

        this._loaderBarBorder = new Graphics();
        this._loaderBarBorder.lineStyle(6, 0x0, 1);
        this._loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);

        this._loaderBar = new Container();
        this._loaderBar.addChild(this._loaderBarFill);
        this._loaderBar.addChild(this._loaderBarBorder);
        this._loaderBar.position.x = (Manager.width - this._loaderBar.width) / 2;
        this._loaderBar.position.y = (Manager.height - this._loaderBar.height) / 2;
        this.addChild(this._loaderBar);

        this.initLoader().then(() => {
            setTimeout(() => {this.loaded();}, 3000);
        })
    }

    async initLoader(): Promise<void> {
        await Assets.init({manifest: manifest});

        const bundlesIds = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loaderBarFill.scale.x = progressRatio;
    }

    private loaded(): void {
        Manager.changeScene(new GameScene(Manager.width, Manager.height))
    }

    update(framesPassed: number): void {
        //...
    }
}