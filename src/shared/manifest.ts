import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "bugs-action",
            assets: {
                "bug-brown": "bug-brown-4.json",
                "bug-red": "bug-red-4.json",
                "bug-green": "bug-green-4.json",
                "bug-destroyed": "bug-red-destoy-1.json"
            }
        },
        {
            name: "normals",
            assets: {
                "bug-brown-normal": "normals-map/bug-brown-normal-4.json",
                "bug-red-normal": "normals-map/bug-red-normal-4 .json",
                "bug-green-normal": "normals-map/bug-green-normal-4.json",
                "bug-destroyed-normal": "normals-map/bug-destroy-normal-1.json",
                "bg-wood-normal": "normals-map/bg-texture-wood-normal.jpg"
            }
        },
        {
            name: "background-textures",
            assets: {
                "bg-wood": "bg-texture-wood.jpg",
            }
        },
        {
            name: "effects",
            assets: {
                "ouch": "ouch.json",
                "poof": "poof.json"
            }
        },
        {
            name: "fonts",
            assets: {
                "PixeloidMono": "fonts/PixeloidMono.ttf"
            }
        },
        {
            name: "sound",
            assets: {
                "poop-effect": "sound/poop-effect.mp3",
                "benben": "sound/ben.mp3"
            }
        },
        {
            name: "icons",
            assets: {
                "undo-button": "undo.png"
            }
        }
    ]
}