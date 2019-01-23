const electron = require("electron")
const {
    ipcRenderer
} = electron




class Imagehandler {

    constructor(settings, state) {
        this.settings = settings
        this.state = state
        this.images = []
        this.index = 0
    }

    loadDone() {

        if (this.settings.getIsRandomized()) {
            this.shuffle()
        }
        console.log("load_done function", this.images)

        this.state.getCurrentImg().src = this.images[0].link
        console.log(this.state.getCurrentImg())
        ipcRenderer.send('event:client_ready')

    }



    addImages(images) {
        console.log("adding images ", images)

        for (let i = 0; i < images.length; i++) {
            this.images.push(images[i])
        }
        console.log(this.images)
    }

    update(current_image, direction) {
        switch (direction) {
            case "next":
                current_image.src = this.getNextImg()
                break
            case "last":
                current_image.src = this.getLastImg()
                break
        }
    }


    getNextImg() {
        let image;

        if (this.index === 0 && this.firstImage === true) {
            this.firstImage = false;
            return this.images[0];

        } else {

            if (this.index + 1 <= Object.keys(this.images).length) {

                this.index++;
                return this.images[this.index].link
            }

        }
    }

    getLastImg() {
        if (this.index > 0 && this.index - 1 >= 0) {
            this.index--;
        }


        return this.images[this.index].link
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


module.exports = Imagehandler