const fs = require('fs');
const request = require('request');
const wallpaper = require("wallpaper");

class Utils {

    constructor(app) {
        this.app = app
    }

    exit_app(app, windows) {
        windows.forEach(w => {

            console.log(w)
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


    async setWallpaper(path) {

        wallpaper.set(path).then(() => {
            console.log("wallpaper set");
        });

    }

    saveSettings(newSettings, path) {

        fs.writeFileSync(path, newSettings, (err) => {
            if (err) {
                return console.log(err)
            }

            console.log("File saved from be utils | path: ", path)
        })

    }

    restartApp() {
        this.app.relaunch()
        this.app.exit()
    }

}

module.exports = Utils;