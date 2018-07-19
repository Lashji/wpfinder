const fs = require('fs');
const request = require('request');
const wallpaper = require("wallpaper");

class Utils {

    constructor() {}

    exit_app(app, windows) {
        windows.forEach(w => {
            w = null;
        })
        app.quit();
    }

    async download(settings) {

        const response = await request.get(settings.url)
            .on('error', (err) => {
                console.log(err)
            })
            .pipe(fs.createWriteStream(settings.path));

        response.on('finish', () => {
            if (settings.setWP) {
                this.setWallpaper(settings.path);
            }
        })

    }


    setWallpaper(path) {

        wallpaper.set(path).then(() => {
            console.log("wallpaper set");
        });

    }

}

module.exports = Utils;