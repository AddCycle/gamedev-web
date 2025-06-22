class Resources {
  constructor() {
    this.toLoad = {
      sky: "/gamedev-web/public/sprites/sky.png",
      ground: "/gamedev-web/public/sprites/ground.png",
      hero: "/gamedev-web/public/sprites/hero-sheet.png",
      shadow: "/gamedev-web/public/sprites/shadow.png",
      rod: "/gamedev-web/public/sprites/rod.png",
      cave: "/gamedev-web/public/sprites/cave.png",
      caveGround: "/gamedev-web/public/sprites/cave-ground.png",
      exit: "/gamedev-web/public/sprites/exit.png",
      knight: "/gamedev-web/public/sprites/knight-sheet-1.png",
      textBox: "/gamedev-web/public/sprites/text-box.png",
      fontWhite: "/gamedev-web/public/sprites/sprite-font-white.png",
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