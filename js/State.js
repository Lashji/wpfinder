const electron = require("electron")


class State {
    constructor(mainWindow){
        this.mainWindow = mainWindow
        this.state = {
            images: []
        }
    }

    getImages() {
        return this.state.images
    }

    addImages(images){

        this.state.images.concat(images)

    }

        

}



module.exports = State