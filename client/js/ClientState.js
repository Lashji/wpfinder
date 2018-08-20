const ImageHandler = require("./ImageHandler.js")

class ClientState {

    constructor(settings) {
        this.settings = settings
        this.imagehandler = undefined
        this.state = {
            maximized: false,
            images: [

            ],
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
        return "src"
    }

    addImages(images){
        this.state.images.concat(images)
    }


    update(images) {
        if (this.imagehandler === undefined){
            this.imagehandler = new ImageHandler(this.settings, this, images)
        } 
            this.imagehandler.update(images)
    }

    getCurrentImg(){

    }

    setNext(){

    }

    setLast(){

    }

}

module.exports = ClientState