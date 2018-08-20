const electron = require("electron")
const {
    ipcRenderer
} = electron




class Imagehandler {

    constructor(settings) {
        this.settings = settings
        this.images = []
        this.index = 0;
        this.currentImg = undefined
    }

    update(images){
        this.images = images

        // dev mode -- remove true after done
        if (this.settings.getIsFiltered() || true){
            // this.shuffle(this.images)
            this.currentImg = this.images[0]
            this.index = 0
            this.setImg()
        } 
 
    }

    setImg(){
        cimg = document.querySelector("#current-img")
        cimg.src = this.currentImg
    }


}


module.exports = Imagehandler