const electron = require('electron')
const State = require('./State.js')
const {

    ipcMain,
    app,
    BrowserWindow

} = electron


class EventHandler {
    constructor(mainWindow, settingsWindow, utils, windowhandler) {
        this.mainWindow = mainWindow
        this.utils = utils
        this.windowhandler = windowhandler
        this.settingsWindow = settingsWindow
        this.state = new State()
    }

    init() {
        let settingswindow = this.settingsWindow

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
            this.settingsWindow = this.settingsWindow.show()
        })

        ipcMain.on('event:exit_without_saving', (event) => {

            settingswindow.close()

        })

        ipcMain.on('event:exit_and_save', (event, newSettings, path) => {
            console.log("new settings = ", newSettings, " path ", path)

            this.utils.saveSettings(newSettings, path);
            settingswindow.close()
            this.utils.restartApp()
        })

        ipcMain.on('event:load_push', (event, data) => {
            console.log("load push, adding images ")
            this.state.addImages(data)
            this.mainWindow.webContents.send("event:load_push", data)

        })


        ipcMain.on("event:load_done", (event) => {
            console.log("LOAD DONE STARTING CLIENT...")
            this.mainWindow.webContents.send("event:load_done")
        })

        ipcMain.on("event:client_ready", (event) => {

            console.log("CLIENT READY.... SHOWING CLIENT")
            // this.mainWindow.show()
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