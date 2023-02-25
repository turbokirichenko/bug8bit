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
                //"bg-forest": "bg-texture-forest.jpg"
            }
        },
        {
            name: "effects",
            assets: {
                "ouch": "public/ouch.json",
                "poof": "public/poof.json"
            }
        }
    ]
}