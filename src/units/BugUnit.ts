import { AnimatedSprite, Texture, Assets } from "pixi.js";

export class BugUnit extends AnimatedSprite {
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
        this.play();
    }

    public setDestroy(): void {
        const textures: Texture[] = Object.values(Assets.get("bug-destroyed").textures);
        this.textures = textures;
        this.stop();
    }
}