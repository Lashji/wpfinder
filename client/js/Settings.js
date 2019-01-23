const fs = require('fs');
const path = require('path');

class Settings {

    constructor(config) {
        const data = this.readConfig(config);
        this.randomize = data.randomize;
        this.filter = data.filter;
        this.savePath = data.save_path;
        this.albums = data.albums;
    }


    readConfig(config) {
        return JSON.parse(fs.readFileSync(config, 'utf8'));
    }

    writeConfig(config) {

    }

    getIsFiltered() {
        return this.filter.isFiltered
    }

    getIsRandomized() {
        return this.randomize
    }

}


module.exports = Settings;