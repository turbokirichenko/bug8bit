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
            name: "background-textures",
            assets: {
                "bg-wood": "bg-texture-wood.jpg",
                "bg-grass": "bg-texture-grass.png",
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
                "WayfarersToyBox": "fonts/WayfarersToyBox.ttf",
                "PixeloidSansBold": "fonts/PixeloidSansBold.ttf",
                "PixeloidMono": "fonts/PixeloidMono.ttf"
            }
        },
        {
            name: "sound",
            assets: {
                "poop-effect": "sound/poop-effect.mp3",
                "tomtomlove": "sound/tomtomlove.mp3"
            }
        },
        {
            name: "icons",
            assets: {
                "play-music": "play-music.png",
                "mute-music": "mute-music.png",
                "undo-button": "undo.png"
            }
        }
    ]
}