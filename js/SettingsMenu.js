const electron = require('electron');
const {
    BrowserWindow
} = electron;

class SettingsMenu extends BrowserWindow {

    constructor(settings_conf, settings) {
        super(settings_conf)
    }
}


module.exports = SettingsMenu;