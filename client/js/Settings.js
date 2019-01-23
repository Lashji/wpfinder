const fs = require('fs');
const path = require('path');

class Settings {

    constructor(path) {
        this.data = this.readConfig(path);
        this.path = path;
        this.randomize = this.data.randomize;
        this.filter = this.data.filter;
        this.savePath = this.data.save_path;
        this.albums = this.data.albums;
    }


    readConfig(config) {
        return JSON.parse(fs.readFileSync(config, 'utf8'));
    }

    writeConfig() {
        let data = JSON.stringify(this.data)
        console.log("Saving data and sending it back to ipcMain ", +this.settings)
        ipcRenderer.send("event:exit_and_save", data, this.path);
    }

    getIsFiltered() {
        return this.filter.isFiltered
    }

    getIsRandomized() {
        return this.randomize
    }

}


module.exports = Settings;