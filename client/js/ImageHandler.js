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

    loadDone(){
        if(this.settings.getIsRandomized()){
            this.shuffle()
        }
        console.log("load funtcion",this.images)
        this.state.getCurrentImg().src = this.images[0].data.images[0].link
    }

    addImages(images){
        console.log("adding images ", images)
        this.images = images

        if (this.images != undefined){
            console.log("this.images", this.images)
            ipcRenderer.send("event:load_done")
        } else {
            console.log("its undefiden")
        }
    }

    update(current_image, direction){
        switch(direction){
            case "next":
                current_image.src = this.getNextImg()
            break
            case "last":
                current_image.src = this.getLastImg()
            break
        }
    }


    getNextImg(){

    }

    getLastImg(){

    }

    shuffle(){

    }

}


module.exports = Imagehandler