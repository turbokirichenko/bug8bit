import { Sprite, Texture } from "pixi.js";
import { LOGO_SRC, GITHUB_REPO_URL } from "../shared/constant";

export class LogoUnit extends Sprite {
    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.texture = Texture.from(LOGO_SRC);
        this.anchor.set(0.5);
        this.width = Math.max(parentWidth*0.2, 240);
        this.height = Math.max(parentWidth*0.2, 240)/4;
        this.x = parentWidth/2;
        this.y = this.height;
        this.interactive = true;
        this.on("pointertap", () => {
            location.assign(GITHUB_REPO_URL);
        });
    }

    public resize(parentWidth: number, parentHeight: number) {
        this.width = Math.max(parentWidth*0.2, 240);
        this.height = Math.max(parentWidth*0.2, 240)/4;
        this.x = parentWidth/2;
        this.y = this.height;
    }
}