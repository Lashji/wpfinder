const electron = require("electron");
const Utils = require('./js/Utils.js');
const WindowHandler = require("./js/WindowHandler.js")
const EventHandler = require("./js/EventHandler.js");

const {
    app
} = electron;

const utils = new Utils();

const windowhandler = new WindowHandler()


app.on('ready', () => {
    const mainWindow = windowhandler.createMainWindow();
    const settingsWindow = windowhandler.createSettingsWindow();
    const events = new EventHandler(mainWindow, settingsWindow, utils, mainWindow);
    events.init()
})