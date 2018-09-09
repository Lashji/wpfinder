const ImageHandler = require("./ImageHandler.js")

class ClientState {

    constructor(settings) {
        this.settings = settings
        this.imagehandler = new ImageHandler(settings, this)
        this.state = {
            maximized: false,
            currentImage: document.querySelector("#current-img"),
            index: 0
        }
    }

    setMaximized(val) {
        this.state.maximized = val
    }

    maximized() {
        return this.state.maximized
    }

    getCurrentImg(){
        return this.state.currentImage
    }

    addImages(images){
        this.imagehandler.addImages(images)
    }


    update(images) {
        this.imagehandler.update(images)
    }

    loadDone(data){
        this.imagehandler.loadDone(data)
    }
}

module.exports = ClientState