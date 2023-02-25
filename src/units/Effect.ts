import { AnimatedSprite, Texture, Assets } from "pixi.js";

export class Effect extends AnimatedSprite {
    constructor(name: string) {
        const texturesEffect: Texture[] = Object.values(Assets.get(name).textures);
        super(texturesEffect);
        this.animationSpeed = 0.5;
        this.anchor.set(0.5);
        this.loop = false;

        this.onComplete = this.fadeOut;
    }

    public start() {
        this.play();
    }

    private fadeOut() {
        this.alpha = 0;
    }
}