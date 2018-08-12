import request from 'request';
const electron = require("electron")

const {
    ipcRenderer
} = electron


class LoadHandler {

    constructor(settings, state) {
        
        this.settings = settings
        this.state = state
        this.data = {}
        this.images = []
        this.loader = new Loader(this.settings)
    }

    start() {

        ipcRenderer.send("event:images_exist")
        ipcRenderer.on("event:images_exist", (res, images) => {

            if (images.length === 0) {
              this.doRequest()  
            } 
            
        })



    }

    doRequest() {

        this.data = this.loader.load()
        this.getImageLinks()

    }

    getImageLinks() {
        Object.keys(this.data).forEach(i => {
            this.images.push(i.link)
        })
    }



}


module.exports = LoadHandler