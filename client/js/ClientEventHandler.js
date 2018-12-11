const electron = require("electron")
const {
    ipcRenderer
} = electron

class ClientEventHandler {

    constructor(handler, state, utils) {
        this.handler = handler
        this.utils = utils
        this.state = state
        this.currentImg = document.querySelector('#current-img')
        this.img = state.getCurrentImg()
        this.init()
    }

    init() {

        ipcRenderer.on('set:next-image', (event) => {
            // let image = this.
            this.state.update('next')
        });

        ipcRenderer.on('set:last-image', (event) => {
            this.state.update('last')
        });


        ipcRenderer.on("event:init", () => {
            this.handler.init();
        })

        ipcRenderer.on('event:save', (image) => {

            console.log('download Done');

        });

        ipcRenderer.on("event:images_back_to_client", (event, images) => {
            this.state.update(images)
        })

        ipcRenderer.on("event:load_done", (event, data) => {
            this.state.loadDone(data)
            this.utils.deleteOverlay()
        })

        ipcRenderer.on("event:load_push", (event, data) => {
            this.state.addImages(data)
        })


        this.currentImg.addEventListener('dblclick', () => {

            if (!this.state.maximized()) {
                this.state.setMaximized(true);
                ipcRenderer.send("event:maximize");
            } else {
                this.state.setMaximized(false);
                ipcRenderer.send('event:unmaximize');
            }
        })
    }


}

module.exports = ClientEventHandler