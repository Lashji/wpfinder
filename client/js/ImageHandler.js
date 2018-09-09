const electron = require("electron")
const {
    ipcRenderer
} = electron




class Imagehandler {

    constructor(settings, state) {
        this.settings = settings
        this.state = state
        this.images = []
        this.index = 0;
    }

    loadDone() {

        if (this.settings.getIsRandomized()) {
            this.shuffle()
        }
        console.log("load_done function", this.images, this.images[0].data)

        this.state.getCurrentImg().src = this.images[0].data.images[0].link
        console.log(this.state.getCurrentImg())
        ipcRenderer.send('event:client_ready')
    }



    addImages(images) {
        console.log("adding images ", images)
        this.images.push(images)
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

    }

    getLastImg() {

    }

    async shuffle() {

    }

}


module.exports = Imagehandler