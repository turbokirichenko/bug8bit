import { Container, Text, TextStyle, Graphics, Sprite } from "pixi.js";
import { IScene } from "../shared/Manager";
import { LogoUnit } from "../units/LogoUnit";

export class UserScene extends Container implements IScene {
    private _logo: LogoUnit;
    private _pointText?: Text;
    private _pointBorder?: Graphics;
    private static _destroyScore: number = 0;

    public static get score(): number {
        return this._destroyScore;
    }

    public static increase(): number {
        return ++this._destroyScore
    }
    
    constructor(parentWidth: number, parentHeight: number) {
        super();

        this._logo = new LogoUnit(parentWidth, parentHeight);
        this.addChild(this._logo);

        const pointText: Text = this.createTitle(`score: ${UserScene._destroyScore}`, 24);
        pointText.x = parentWidth / 2;
        pointText.y = parentHeight - (parentHeight*0.08 - 10);
        this._pointText = pointText;
        this.addChild(this._pointText);

        const pointBorder: Graphics = this.createLineBorder(parentWidth, parentHeight);
        this._pointBorder = pointBorder;
        this.addChild(this._pointBorder);
    }

    update(framesPassed: number) {
        // ...
        if (this._pointText) {
            this._pointText.text = `score: ${UserScene._destroyScore}`
        }
    }

    resize(parentWidth: number, parentHeight: number) {
        this._logo.resize(parentWidth, parentHeight);

        this._pointText!.x = parentWidth / 2;
        this._pointText!.y = parentHeight - (parentHeight*0.08 - 10);

        if (this._pointBorder) {
            this.removeChild(this._pointBorder);
            this._pointBorder.destroy();
        }
        const pointBorder: Graphics = this.createLineBorder(parentWidth, parentHeight);
        if (this.addChild(pointBorder)) {
            this._pointBorder = pointBorder;
        }
    }

    private createTitle (titleName: string, fontSize: number = 34): Text {
        const style: TextStyle = new TextStyle({
            fontFamily: "PixeloidMono",
            fontSize,
            fill: ['#ffff00', '#ffff00'], // gradient
            stroke: '#000000',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 2,
            dropShadowAngle:  5* Math.PI / 6,
            dropShadowDistance: 10,
            wordWrap: true,
            wordWrapWidth: 480,
        });

        const title: Text = new Text(titleName, style);
        title.alpha = 0.6;
        title.anchor.set(0.5);
        return title;
    }

    private createLineBorder (parentWidth: number, parentHeight: number): Graphics {
        const pointBorder: Graphics = new Graphics();
        /*pointBorder.lineStyle(8, 0x000000, 0.9);
        pointBorder.drawRoundedRect(15, 19, parentWidth - 30, parentHeight - 30, 0);*/
        /*pointBorder.lineStyle(4, 0xffb000, 1);
        pointBorder.drawRoundedRect(19, 15, parentWidth - 30, parentHeight - 30, 0);*/
        return pointBorder;
    }
}