const electron = require('electron')
const State = require('./State.js')
const {

    ipcMain,
    app,
    BrowserWindow

} = electron


class EventHandler {
    constructor(mainWindow, utils, windowhandler) {
        this.mainWindow = mainWindow
        this.utils = utils 
        this.windowhandler = windowhandler
        this.settingsWindow = undefined
        this.state = new State()
    }

    init() {

        ipcMain.on('next-image', (event) => {
            this.mainWindow.webContents.send("set:next-image");
        })

        ipcMain.on('last-image', (event) => {
            this.mainWindow.webContents.send("set:last-image");
        })

        ipcMain.on('event:maximize', (event) => {
            console.log(this.mainWindow);

            this.mainWindow.maximize();
        })


        ipcMain.on('event:unmaximize', (event) => {
            this.mainWindow.unmaximize();
        })

        ipcMain.on('event:quit', () => {
            this.mainWindow = null;
            app.quit();
        })

        ipcMain.on('event:save', (event, settings) => {

            this.utils.download(settings);

        })

        ipcMain.on('event:settingsMenu', (event) => {
            this.settingsWindow = this.windowhandler.createSettingsWindow();
        })

        ipcMain.on('event:exit_without_saving', (event) => {
            const windows = this.windowhandler.getWindows();
            this.utils.exit_app(app, windows);
        })


        ipcMain.on('event:load_push', (event, data) => {
            console.log("load push")
            this.state.addImages(data)
        })


        ipcMain.on("event:load_done", (event) => {
            let imgs = this.state.getImages();
            this.mainWindow.webContents.send("event:images_back_to_client", imgs)
        })

        ipcMain.on("event:load_ready", (event) => {
            // CHANGE THIS TO CLIENT READY
            this.mainWindow.show()
        })

        ipcMain.on("event:images_exist", (event) => {
            console.log("event:images_exist");
            let data = {}
            if (this.state.getImages.length > 0) {

                data.empty = false
                data.images = this.state.getImages()

            } else {
                data.empty = true                
            }
            console.log("sending data back.... \n", data)
            this.mainWindow.webContents.send("event:images_exist", data)
        })
        
        ipcMain.on("event:log", (event, log) => {
            console.log(log)
        })

    }

}



module.exports = EventHandler;