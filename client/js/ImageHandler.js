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

    async loadDone() {
        if (this.settings.getIsRandomized()) {
            this.shuffle()
        }
        console.log("load funtcion", this.images, "len", this.images.length)
        let tmp = this.images[0]
        console.log("tmp", tmp);
        
        console.log("this.images data ", this.images)
        // this.state.getCurrentImg().src = this.images[0].data.images[0].link
    }

    async addImages(images) {
        console.log("adding images ", images)
        await this.images.push(images)

        if (this.images != undefined) {
            ipcRenderer.send("event:load_done")
        } else {
            console.log("its undefined")
        }
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

    shuffle() {

    }

}


module.exports = Imagehandler