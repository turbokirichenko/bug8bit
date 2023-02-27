import { AnimatedSprite, Texture, Assets, Filter, Container } from "pixi.js";
import { diffuseGroup, normalGroup } from "@pixi/lights";

export class BugUnit extends Container {
    private _diffuse: BugAnimated;
    private _normal: BugAnimated;
    private _dimention: number;
    public get radius() {
        return this._dimention/2;
    }
    private static getTextures = (someName: string):Texture[] =>
        Object.values(Assets.get(someName).textures);

    constructor(index: number) {
        super();
        enum BugNames { 
            "bug-brown", 
            "bug-red", 
            "bug-green"
        };

        const textureName = BugNames[index];
        const textures = BugUnit.getTextures(textureName);
        const texturesNormal = BugUnit.getTextures(`${textureName}-normal`);
        this._dimention = 64;
        this._diffuse = new BugAnimated(textures, this._dimention);
        this._normal = new BugAnimated(texturesNormal, this._dimention);
        this._diffuse.parentGroup = diffuseGroup;
        this._normal.parentGroup = normalGroup;
        this.addChild(this._diffuse);
        this.addChild(this._normal);
        this._diffuse.play();
        this._normal.play();
    }

    public setDestroy(): void {
        const textureDestroyed: Texture[] = BugUnit.getTextures('bug-destroyed');
        const textureDestroyedNormal: Texture[] = BugUnit.getTextures("bug-destroyed-normal");
        this._diffuse.textures = textureDestroyed;
        this._normal.textures = textureDestroyedNormal;
        this._diffuse.stop();
        this._normal.stop();
    }
}

class BugAnimated extends AnimatedSprite {
    constructor(textures: Texture[], dim: number = 64, aSpeed: number = 0.15) {
        super(textures);

        this.animationSpeed = aSpeed;
        this.anchor.set(0.5);
        this.width = dim;
        this.height = dim;
    }
}