import { Container, Text, TextStyle, Sprite, Texture } from "pixi.js";
import { IScene } from "../shared/Manager";
import { sound } from '@pixi/sound';

export class UserScene extends Container implements IScene {
    private _titleText?: Text;
    private _pointText?: Text;
    private static _destroyScore: number = 0;
    private _MusicButton?: Sprite;
    private _played: Boolean = true;

    public static get score(): number {
        return this._destroyScore;
    }

    public static increase(): number {
        return ++this._destroyScore
    }
    
    constructor(parentWidth: number, parentHeight: number) {
        super();

        const text: Text = this.createTitle("Bug8bit");
        text.x = parentWidth / 2;
        text.y = 50;
        if (this.addChild(text)) {
            this._titleText = text;
        }

        const pointText: Text = this.createTitle(`score ${UserScene._destroyScore}`, 36, false);
        pointText.x = parentWidth / 2;
        pointText.y = parentHeight - 50;
        if (this.addChild(pointText)) {
            this._pointText = pointText;
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
    }

    private createTitle (titleName: string, fontSize: number = 36, bold: Boolean = true): Text {
        const style: TextStyle = new TextStyle({
            fontFamily: bold ? "PixeloidSansBold" : "PixeloidMono",
            fontSize,
            fill: ['#ff9900', '#ff9900'], // gradient
            stroke: '#000000',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 2,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 10,
            wordWrap: true,
            wordWrapWidth: 220,
            lineJoin: 'round',
        });

        const title: Text = new Text(titleName, style);
        title.anchor.set(0.5);
        return title;
    }

    private mute() {

    }

    private unmute() {

    }
}