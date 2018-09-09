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
    setCurrentImg(img){
        this.state.currentImage = img
    }

    addImages(images){
        this.imagehandler.addImages(images)
    }


    update(direction) {
        this.imagehandler.update(this.state.currentImage, direction)
    }

    loadDone(){
        this.imagehandler.loadDone()
    }
}

module.exports = ClientState