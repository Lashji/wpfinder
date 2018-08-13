const electron = require("electron")
const Loader = require("./Loader.js")
const {
    ipcRenderer
} = electron


class LoadHandler {

    constructor(settings, state) {

        this.settings = settings
        this.state = state
        this.data = {}
        this.images = []
        this.loader = new Loader(this.state, this.settings)
    }

    start() {

        ipcRenderer.send("event:images_exist")

        ipcRenderer.on("event:images_exist", (res, data) => {

            if (data.empty) {
                console.log("empty")
                this.doRequest()
            }

        })



    }

    doRequest() {

        this.loader.load()
        this.getImageLinks()

    }

    getImageLinks() {

        Object.keys(this.data).forEach(i => {
            this.images.push(i.link)
        })
    }



}


module.exports = LoadHandler