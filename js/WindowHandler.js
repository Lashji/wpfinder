const electron = require('electron')
const { 
    BrowserWindow
} = electron;
const SettingsMenu = require("./SettingsMenu.js");

class WindowHandler {


    constructor(handler) {
        this.handler = handler;
        this.windows = []
    }


    async createMainWindow() {

        let mainWindow = new BrowserWindow({
            height: 788,
            width: 1400,
            minHeight: 788,
            minWidth: 1400,
            show: false,
            frame: false,
        });
        mainWindow.loadURL(`file://${__dirname}/../client/main.html`);
        this.windows.push({
            name: "mainwindow",
            window: mainWindow
        });
        // mainWindow.setMenu(null)

        mainWindow.once('ready-to-show', () => {
            this.handler.loadImages(mainWindow);
        })

    }

    createSettingsWindow() {
        const menu_conf = {
            height: 300,
            width: 480,
            minHeight: 300,
            minWidth: 480,
            show: true,
            frame: false,
            resizable: false
        }

        const settingsWindow = new SettingsMenu(menu_conf, this.settings);
        settingsWindow.loadURL(`file://${__dirname}/../client/settings.html`);

        this.windows.push({
            name: "settingswindow",
            window: settingsWindow
        });
    }

    getWindow(window) {

        for (var i = 0; i < this.windows.length; i++) {
            if (this.windows[i].name === window) {
                return this.windows[i].window;
            }
        }
    }

    getWindows() {
        return this.windows;
    }
}



module.exports = WindowHandler;