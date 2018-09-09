const electron = require("electron")
const {
    ipcRenderer
} = electron

const fs = require('fs');
const Path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');



class ClientUtils {

    constructor(state){
        this.state = state
        this.folderName = "wallpapers"
        this.homepath = this.createPath(os.homedir(), this.folderName);
        this.currentImg = this.state.getCurrentImg()
    }

    async setAsWallpaper() {

        await this.save(true);

    }

    async save(setAsWP) {

        if (!this.pathExist(this.homepath)) {

            this.createFolder();
        }

        let name = this.createImageName();
        let slash = process.platform === 'win32' ? '\\' : '/';
        const path = this.homepath + slash + name;

        const settings = {
            url: this.currentImg.src,
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

    mkdirp(this.homepath);

    }


    createImageName() {
        const url = this.currentImg.src;
        const index = url.lastIndexOf('/');
        const name = url.substring(index + 1, url.length);

        return name;
    }

    draw(img) {

        this.currentImg.src = img.url;

    }

    log(log){
        ipcRenderer.send("event:log", log)
    }

}


module.exports = ClientUtils