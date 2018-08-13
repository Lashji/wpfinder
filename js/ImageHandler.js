const electron = require('electron');
const {
    BrowserWindow,
    ipcMain
} = electron;

class ImageHandler {


    constructor(imgLoader, settings) {
        this.settings = settings;
        this.loader = imgLoader;
        this.index = 0;
        this.images = [];
        this.firstImage = true;


    }



    async loadImages(mainWindow) {

        this.loader.load(mainWindow)
        this.images = await this.loader.getImages();

        return this.images;
    }

    getImages() {
        return this.images;
    }

    getNextImage() {
        let image;

        if (this.index === 0 && this.firstImage === true) {
            this.firstImage = false;
            return this.images[0];

        } else {

            if (this.index + 1 <= Object.keys(this.images).length) {

                this.index++;
                return this.images[this.index];
            }

        }

    }
    getLastImage() {

        if (this.index > 0 && this.index - 1 >= 0) {
            this.index--;
        }


        return this.images[this.index];

    }

    filterImages() {
        const tmp = [];

        for (var i = 0; i < this.images.length; i++) {

            if (this.images[i].height === 1080 && this.images[i].width === 1920) {
                tmp.push(this.images[i]);
            }

        }

        this.images = tmp;
    }

    shuffle() {


        let counter = this.images.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = this.images[counter];
            this.images[counter] = this.images[index];
            this.images[index] = temp;
        }

    }

}

module.exports = ImageHandler;