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
            utils.draw(img);
        });

        ipcRenderer.on('set:last-image', (event) => {
            utils.draw(img);
        });

    
        ipcRenderer.on('event:save', (image) => {

            console.log('download Done');

        });

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