import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "bugs-action",
            assets: {
                "bug-brown": "public/bug-brown-4.json",
                "bug-red": "public/bug-red-4.json",
                "bug-green": "public/bug-green-4.json",
                "bug-destroyed": "public/bug-red-destoy-1.json"
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
                "ouch": "public/ouch.json",
                "poof": "public/poof.json"
            }
        },
        {
            name: "fonts",
            assets: {
                "WayfarersToyBox": "public/fonts/WayfarersToyBox.ttf",
                "PixeloidSansBold": "public/fonts/PixeloidSansBold.ttf",
                "PixeloidMono": "public/fonts/PixeloidMono.ttf"
            }
        },
        {
            name: "sound",
            assets: {
                "poop-effect": "public/sound/poop-effect.mp3",
                "tomtomlove": "public/sound/tomtomlove.mp3"
            }
        },
        {
            name: "icons",
            assets: {
                "play-music": "public/play-music.png",
                "mute-music": "public/mute-music.png"
            }
        }
    ]
}