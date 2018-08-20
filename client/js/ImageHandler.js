const electron = require("electron")
const {
    ipcRenderer
} = electron




class Imagehandler {

    constructor(settings, state, images) {
        this.settings = settings
        this.state = state
        this.images = images
        this.index = 0;
        this.currentImg = undefined
    }

    update(images){
        console.log("update image handler")
        this.images = images
        
        // dev mode -- remove true after done
        if (this.settings.getIsFiltered() || true){
            this.state.shuffle()
            this.currentImg = this.images[0]
            this.index = 0
            this.setImg()
        } 
 
    }

    setImg(){
        console.log(this.images)
        let cimg = document.querySelector("#current-img")
        console.log(cimg)
        cimg.src = this.currentImg
    }

   

}


module.exports = Imagehandler