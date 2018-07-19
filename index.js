const electron = require("electron");
const Settings = require('./js/settings.js');
const settings = new Settings(__dirname + "/config.json");
const ImageHandler = require("./js/ImageHandler.js");
const ImageLoader = require("./js/ImageLoader.js");
const SettingsMenu = require("./js/SettingsMenu.js");
const Utils = require('./js/Utils.js');
const WindowHandler = require("./js/WindowHandler.js")

const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

const imgLoader = new ImageLoader(settings);
const handler = new ImageHandler(imgLoader, settings);
const utils = new Utils();
const windowhandler = new WindowHandler(handler)
const EventHandler = require("./js/EventHandler.js");

let mainWindow;
let settingsWindow;

ipcMain.on('load-ready', () => {

    mainWindow = windowhandler.getWindow("mainwindow");
    const events = new EventHandler(mainWindow, handler, utils, settings);
    events.init();

    if (settings.randomize) {
        handler.shuffle();
    }


    let img = handler.getNextImage();
    mainWindow.webContents.send("event:init", img);
    mainWindow.show();
});

app.on('ready', () => {
    mainWindow = windowhandler.createMainWindow();


});
