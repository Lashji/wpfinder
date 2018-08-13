

class State {
    constructor(){
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