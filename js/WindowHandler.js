const electron = require('electron')
const { 
    BrowserWindow
} = electron;
const SettingsMenu = require("./SettingsMenu.js");

class WindowHandler {


    constructor() {
        this.windows = []
    }


    createMainWindow() {

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

        mainWindow.once("ready-to-show", () => {
            console.log("ready to show - initializing")
                mainWindow.webContents.send("event:init")
            console.log("init send");
            // mainWindow.show()
        })

       return mainWindow
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

        const settingsWindow = new SettingsMenu(menu_conf);
        settingsWindow.loadURL(`file://${__dirname}/../client/settings.html`);

        this.windows.push({
            name: "settingswindow",
            window: settingsWindow
        });

        return settingsWindow
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