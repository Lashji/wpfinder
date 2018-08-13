const electron = require("electron")
const {
    ipcRenderer
} = electron

class Buttons {

    constructor(utils, settings) {
        this.settings = settings
        this.last = document.querySelector('#last-div');
        this.next = document.querySelector('#next-div');
        this.saveButton = document.querySelector('#save');
        this.wpButton = document.querySelector('#wallpaper');
        this.exitButton = document.querySelector('#exit');
        this.settingsButton = document.querySelector("#settings");
        this.utils = utils
    }

    init() {


        this.last.addEventListener('click', () => {


            ipcRenderer.send('last-image');


        });

        this.next.addEventListener('click', () => {

            ipcRenderer.send('next-image');

        });


        this.wpButton.addEventListener('click', () => {
            this.utils.setAsWallpaper();
        })

        this.saveButton.addEventListener('click', () => {
            this.utils.save(false);
        })

        this.exitButton.addEventListener('click', () => {
            ipcRenderer.send('event:quit');
        })

        this.settingsButton.addEventListener('click', () => {

            ipcRenderer.send('event:settingsMenu');

        })

    }

}

module.exports = Buttons