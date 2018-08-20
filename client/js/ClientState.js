const ImageHandler = require("./ImageHandler.js")

class ClientState {

    constructor(settings) {
        this.settings = settings
        this.imagehandler = new ImageHandler(settings)
        this.state = {
            maximized: false,
            images: [

            ]
        }
    }

    setMaximized(val) {
        this.state.maximized = val
    }

    maximized() {
        return this.state.maximized
    }

    getCurrentImg(){
        return "src"
    }

    addImages(images){
        this.state.images.concat(images)
    }


    update() {
        this.imagehandler.update()
    }
}

module.exports = ClientState