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
        console.log("creating main window")
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
            mainWindow.show()
        })

        return mainWindow
    }

    createSettingsWindow() {
        console.log("creating settings window")
        const menu_conf = {
            height: 400,
            width: 600,
            minHeight: 400,
            minWidth: 600,
            show: false,
            frame: false,
            resizable: false
        }

        const settingsWindow = new SettingsMenu(menu_conf);
        settingsWindow.loadURL(`file://${__dirname}/../client/settings.html`);
        console.log(settingsWindow)
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