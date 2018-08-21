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
                this.loader.load()
            } else {
                ipcRenderer.send("event:load_images")
            }

        })



    }


}


module.exports = LoadHandler