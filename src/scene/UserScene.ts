import { Container, Text, TextStyle, Graphics, Sprite } from "pixi.js";
import { Manager, IScene } from "../shared/Manager";
import { sound } from '@pixi/sound';
import { GameScene } from "./GameScene";

export class UserScene extends Container implements IScene {
    private _titleText?: Text;
    private _pointText?: Text;
    private _pointBorder?: Graphics;
    private _reloadButton: Sprite;
    private static _destroyScore: number = 0;

    public static get score(): number {
        return this._destroyScore;
    }

    public static increase(): number {
        return ++this._destroyScore
    }
    
    constructor(parentWidth: number, parentHeight: number) {
        super();

        const reloadButton: Sprite = Sprite.from("undo-button");
        reloadButton.width = 32;
        reloadButton.height = 32;
        reloadButton.x = 36;
        reloadButton.y = 50;
        this._reloadButton = reloadButton;
        this._reloadButton.interactive = true;
        this._reloadButton.on("pointertap", () => {
            Manager.changeScene(new GameScene(parentWidth, parentHeight))
        });
        this.addChild(reloadButton);

        const text: Text = this.createTitle("Bug8bit");
        text.x = parentWidth / 2;
        text.y = 70;
        if (this.addChild(text)) {
            this._titleText = text;
        }

        const pointText: Text = this.createTitle(`score ${UserScene._destroyScore}`, 36, false);
        pointText.x = parentWidth / 2;
        pointText.y = parentHeight - 70;
        if (this.addChild(pointText)) {
            this._pointText = pointText;
        }

        const pointBorder: Graphics = this.createLineBorder(parentWidth, parentHeight);
        if (this.addChild(pointBorder)) {
            this._pointBorder = pointBorder;
        }

        sound.play('tomtomlove');
    }

    update(framesPassed: number) {
        // ...
        if (this._pointText) {
            this._pointText.text = `score ${UserScene._destroyScore}`
        }
    }

    resize(parentWidth: number, parentHeight: number) {
        console.log('resize!!!');
        this._titleText!.x = parentWidth / 2;
        this._titleText!.y = 100;

        this._pointText!.x = parentWidth / 2;
        this._pointText!.y = parentHeight - 100;

        if (this._pointBorder) {
            this.removeChild(this._pointBorder);
            this._pointBorder.destroy();
        }
        const pointBorder: Graphics = this.createLineBorder(parentWidth, parentHeight);
        if (this.addChild(pointBorder)) {
            this._pointBorder = pointBorder;
        }
    }

    private createTitle (titleName: string, fontSize: number = 34, bold: Boolean = true): Text {
        const style: TextStyle = new TextStyle({
            fontFamily: bold ? "PixeloidSansBold" : "PixeloidMono",
            fontSize,
            fill: ['#ffff00', '#ff9900'], // gradient
            stroke: '#000000',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 2,
            dropShadowAngle:  5* Math.PI / 6,
            dropShadowDistance: 10,
            wordWrap: true,
            wordWrapWidth: 220,
            lineJoin: 'round',
        });

        const title: Text = new Text(titleName, style);
        title.anchor.set(0.5);
        return title;
    }

    private createLineBorder (parentWidth: number, parentHeight: number): Graphics {
        const pointBorder: Graphics = new Graphics();
        pointBorder.lineStyle(8, 0x000000, 0.9);
        pointBorder.drawRoundedRect(15, 19, parentWidth - 30, parentHeight - 30, 0);
        pointBorder.lineStyle(8, 0xffb000, 1);
        pointBorder.drawRoundedRect(19, 15, parentWidth - 30, parentHeight - 30, 0);
        return pointBorder;
    }
}