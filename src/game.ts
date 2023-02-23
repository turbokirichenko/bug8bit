import { Application, Sprite, Loader, Assets, AnimatedSprite, Texture } from 'pixi.js';
import type PIXI from 'pixi.js';

export const app = new Application({
	view: document.getElementById("app__pixi") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

async function init() {
    enum BugNames { 
        "bug-brown" = 0,
        "bug-red", 
        "bug-green"
    };
    let currentBugName = 0;

    Assets.add(BugNames[0], 'public/bug-brown-4.json');
    Assets.add(BugNames[1], 'public/bug-red-4.json');
    Assets.add(BugNames[2], 'public/bug-green-4.json');
    const sheet = await Assets.load([
        BugNames[0],
        BugNames[1],
        BugNames[2]
    ]);

    const textures: PIXI.Texture[] = makeBugTexture(BugNames[currentBugName], sheet);
    const clampy: PIXI.AnimatedSprite = new AnimatedSprite(textures);
    clampy.anchor.set(0.5);
    clampy.x = app.screen.width / 2;
    clampy.y = app.screen.height / 2;
    clampy.animationSpeed = 0.2;
    clampy.interactive = true;
    clampy.cursor = 'pointer';
    clampy.gotoAndPlay(0);
    app.stage.addChild(clampy);

    clampy.on('pointertap', async () => {
        currentBugName = (++currentBugName)%3;
        const textures: PIXI.Texture[] = makeBugTexture(BugNames[currentBugName], sheet);
        clampy.textures = textures;
        clampy.play();
    });
}

function makeBugTexture(name: string, sheet: Record<string, any>): PIXI.Texture[] {
    const explotionTexture = [];
    let i;
    for (i = 0; i < 4; ++i) {
        const texture:PIXI.Texture = sheet[name].textures[`${name}-4${i}.png`];
        explotionTexture.push(texture);
    }
    return explotionTexture;
}

init();