class ClientState {

    constructor(settings) {
        this.settings = settings
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

}

module.exports = ClientState