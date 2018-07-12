const fs = require('fs');
const path = require('path');

class Settings {

    constructor(config) {
        let data = this.readConfig(config);
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

}


module.exports = Settings;