const request = require("request");
const axios = require("axios");
// const Worker = require('webworker-threads').Worker;


class ImageLoader {

    constructor(settings) {
        this.images = [];
        this.ready = false;
        this.filter = true;
        this.albums = settings.albums;
        this.init = true;
    }

    load(mainWindow) {

        this.albums.forEach((a) => {

            axios.get(a, {

                headers: {
                    'Authorization': "Client-ID 4abb3979dc91311"
                }

            }).then((res) => {

                const images = res.data.data.images;


                Object.keys(images).forEach(key => {
                    if (images[key] !== undefined) {

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
                    }

                });

                if (this.init) {
                    this.init = false;
                    mainWindow.webContents.send('load-ready');
                }

            }).catch((err) => {
                console.log(err);

            });
        })
        mainWindow.webContents.send('done');

        // console.log(this.images.length)

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