const electron = require("electron")
const {
    ipcRenderer
} = electron

const fs = require('fs');
const Path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');



class ClientUtils {

    constructor(){
        this.folderName = "wallpapers"
        this.homepath = this.createPath(os.homedir(), folderName);
    }

    async setAsWallpaper() {

        await save(true);

    }

    async save(setAsWP) {

        if (!this.pathExist(this.homepath)) {

            this.createFolder();
        }

        let name = this.createImageName();
        let slash = process.platform === 'win32' ? '\\' : '/';
        const path = this.homepath + slash + name;

        const settings = {
            url: currentImg.src,
            fileName: name,
            path: path,
            setWP: setAsWP
        }


        ipcRenderer.send('event:save', settings);

    }


    createPath(dir, folder) {

        return Path.resolve(dir, folder);
    }

    pathExist(path) {

        return fs.existsSync(path);


    }

    createFolder() {

        await mkdirp(this.homepath);

    }


    createImageName() {
        const url = currentImg.src;
        const index = url.lastIndexOf('/');
        const name = url.substring(index + 1, url.length);

        return name;
    }

    draw(img) {

        currentImg.src = img.url;

    }

    log(log){
        ipcRenderer.send("event:log", log)
    }

}


module.exports = ClientUtils