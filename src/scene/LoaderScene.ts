import { Container, Graphics, Assets, Sprite, Text, TextStyle } from 'pixi.js'
import { Manager, IScene } from '../shared/Manager';
import { GameScene } from './GameScene';
import { manifest } from '../shared/manifest';

export class LoaderScene extends Container implements IScene {
    private _loaderBackground: Sprite;
    private _loaderBar: Container;
    private _loaderBarBorder: Graphics;
    private _loaderBarFill: Graphics;
    private _loaderClickText?: Text;
    private _onloaded: Boolean = false;

    constructor() {
        super();

        this._loaderBackground = Sprite.from("bg-texture-sea.png");
        this._loaderBackground.anchor.set(0.5);
        this._loaderBackground.x = (Manager.width) / 2;
        this._loaderBackground.y = (Manager.height) / 2;
        this.addChild(this._loaderBackground);

        const loaderBarWidth = 320;

        this._loaderBarFill = new Graphics();
        this._loaderBarFill.beginFill(0x00bfff , 0.8)
        this._loaderBarFill.drawRect(0, 0, loaderBarWidth, 48);
        this._loaderBarFill.endFill();
        this._loaderBarFill.scale.x = 0;

        this._loaderBarBorder = new Graphics();
        this._loaderBarBorder.lineStyle(4, 0x0, 1);
        this._loaderBarBorder.drawRect(0, 0, loaderBarWidth, 48);

        this._loaderBar = new Container();
        this._loaderBar.addChild(this._loaderBarFill);
        this._loaderBar.addChild(this._loaderBarBorder);
        this._loaderBar.position.x = (Manager.width - this._loaderBar.width) / 2;
        this._loaderBar.position.y = (Manager.height - this._loaderBar.height) / 2;
        this._loaderBar.interactive = true;
        this._loaderBar.on("pointertap", () => {
            if (this._onloaded) {
                this.loaded();
            }
        })

        this.addChild(this._loaderBar);

        this.initLoader().then(() => {
            const style: TextStyle = new TextStyle({
                fontSize: 32,
                fontWeight: "bold"
            });
            this._loaderClickText = new Text('START GAME', style);
            this._loaderClickText.x = Manager.width / 2;
            this._loaderClickText.y = Manager.height / 2 - 1;
            this._loaderClickText.anchor.set(0.5);
            this.addChild(this._loaderClickText);
            this._onloaded = true;
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

    resize(parentWidth: number, parentHeight: number): void {
        //...
        this._loaderBackground.position.x = (parentWidth) / 2;
        this._loaderBackground.position.y = (parentHeight) / 2;
        this._loaderBar.position.x = (parentWidth - this._loaderBar.width) / 2;
        this._loaderBar.position.y = (parentHeight - this._loaderBar.height) / 2;
        if (this._loaderClickText) {
            this._loaderClickText!.x = parentWidth / 2;
            this._loaderClickText!.y = parentHeight / 2 - 3;
        }
    }
}