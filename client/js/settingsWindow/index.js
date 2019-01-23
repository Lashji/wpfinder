const electron = require("electron")
const {
    ipcRenderer
} = electron
const Settings = require("./js/Settings.js");
const settings = new Settings(__dirname + "/../config.json")
const SettingsWindowHandler = require("./js/settingsWindow/settingsWindowHandler.js")

const settingsWindowHandler = new SettingsWindowHandler(settings)
settingsWindowHandler.init()