const electron = require('electron');
const {

    ipcMain,
    app,
    BrowserWindow

} = electron;


class EventHandler {
    constructor(mainWindow, handler, utils, settings, windowhandler) {
        this.mainWindow = mainWindow;
        this.handler = handler;
        this.utils = utils;
        this.settings = settings;
        this.windowhandler = windowhandler;
        this.settingsWindow = undefined;
    }

    init() {

        ipcMain.on('next-image', (event) => {
            this.mainWindow.webContents.send("set:next-image", this.handler.getNextImage(), this.handler.getImages());
        });

        ipcMain.on('last-image', (event) => {
            this.mainWindow.webContents.send("set:last-image", this.handler.getLastImage());
        });

        ipcMain.on('event:maximize', (event) => {
            this.mainWindow.maximize();
        })


        ipcMain.on('event:unmaximize', (event) => {
            this.mainWindow.unmaximize();
        });


        ipcMain.on('event:quit', () => {
            this.mainWindow = null;
            app.quit();
        })

        ipcMain.on('event:save', (event, settings) => {

            this.utils.download(settings);

        });

        ipcMain.on('event:settingsMenu', (event) => {
            this.settingsWindow = this.windowhandler.createSettingsWindow();
        });

        ipcMain.on('event:exit_without_saving', (event) => {
            const windows = this.windowhandler.getWindows();
            this.utils.exit_app(app, windows);
        })

        ipcMain.on('done', (event) => {

            if (this.settings.randomize) {
                this.handler.shuffle();
            }

        })

    }



}



module.exports = EventHandler;