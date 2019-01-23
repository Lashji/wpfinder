const electron = require('electron');
const {
    ipcRenderer
} = electron;
const TemplateRenderer = require("./TemplateRenderer")

class settingsWindowHandler {

    constructor(settings) {
        console.log("settingswindow constructor")
        this.settings = settings;
        this.hook = document.querySelector("#top");
        this.templateRenderer = new TemplateRenderer(this.hook, settings);
        this.cancel_button = document.querySelector("#cancel");
        this.apply_button = document.querySelector("#apply");
        this.settings_home = document.querySelector('#settings-home-menu-button');
        this.settings_list = document.querySelector("#settings-list-menu-button");
        this.settings_conf = document.querySelector("#settings-conf-menu-button");
        this.main = document.querySelector('#top');
        this.list = document.querySelector("#list");
        this.renderTemplate("list")
    }

    init() {
        console.log("settingswindow init")
        this.applyEventListeners()
    }

    renderTemplate(template) {

        this.templateRenderer.renderTemplate(template)

    }



    applyEventListeners() {
        console.log("Applying eventListeners")
        this.settings_home.addEventListener('click', () => {
            this.renderTemplate("general")
        });


        this.settings_list.addEventListener('click', () => {

            this.renderTemplate("list")

        });


        this.settings_conf.addEventListener('click', () => {

            this.renderTemplate("conf")
        });


        this.cancel_button.addEventListener('click', () => {

            ipcRenderer.send("event:exit_without_saving");


        });

        this.apply_button.addEventListener('click', () => {

            ipcRenderer.send("event:exit_and_save");

        });
    }
}

module.exports = settingsWindowHandler