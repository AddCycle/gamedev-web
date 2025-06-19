class Resources {
    constructor() {
        this.toLoad = {
            sky: "/gamedev-web/public/sprites/sky.png",
            ground: "/gamedev-web/public/sprites/ground.png",
            hero: "/gamedev-web/public/sprites/hero-sheet.png",
            shadow: "/gamedev-web/public/sprites/shadow.png",
            rod: "/gamedev-web/public/sprites/rod.png",
        };

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();