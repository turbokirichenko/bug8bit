import { AnimatedSprite, Texture, Assets, Filter } from "pixi.js";

export class BugUnit extends AnimatedSprite {
    private _radius: number;
    public get radius() {
        return this._radius;
    }

    constructor(index: number) {
        enum BugNames { 
            "bug-brown", 
            "bug-red", 
            "bug-green"
        };

        const textures: Texture[] = Object.values(Assets.get(BugNames[index]).textures);
        super(textures);
        this.animationSpeed = 0.15;
        this.anchor.set(0.5);
        this.width = 64;
        this.height = 64;
        this._radius = Math.max(this.width, this.height)/2;

        this.play();
    }

    public setDestroy(): void {
        const textures: Texture[] = Object.values(Assets.get("bug-destroyed").textures);
        this.textures = textures;
        this.stop();
    }
}