const request = require("request");
const axios = require("axios");
// const Worker = require('webworker-threads').Worker;


class ImageLoader {

    constructor(settings) {
        this.settings = settings;
        this.images = [];
        this.ready = false;
        this.filter = true;
    }

    async load(mainWindow) {


        await axios.get("https://api.imgur.com/3/album/rMPdm", {

            headers: {
                'Authorization': "Client-ID 4abb3979dc91311"
            }

        }).then((res) => {

            const images = res.data.data.images;

            Object.keys(images).forEach(key => {
                let img = images[key];

                if (this.filter) {
                    if (img.width === 1920 && img.height === 1080) {
                        this.images.push({
                            url: images[key].link,
                            height: images[key].height,
                            width: images[key].width
                        });
                    }
                } else {
                    this.images.push(

                        {
                            url: images[key].link,
                            height: images[key].height,
                            width: images[key].width
                        }

                    );
                }

            });


            mainWindow.webContents.send('load-ready');

        }).catch((err) => {
            console.log(err);

        });


    }






    loadReady() {
        this.ready = true;
        console.log(this.ready)
    }

    getImages() {
        return this.images;
    }

    loadIsReady() {
        return this.ready;
    }
}

module.exports = ImageLoader;