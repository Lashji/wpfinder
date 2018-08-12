const ClientUtils = require("./ClientUtils.js")
const ClientEventHandler = require("./ClientEventHandler.js")
const ClientState = require("./ClientState.js")
const LoadHandler = require("./LoadHandler.js")
const Settings = require("./Settings.js")
const Buttons = require("./Buttons.js")

class ClientHandler {

    constructor() {
        this.settings = new Settings(__dirname + "/config.json")
        this.clientState = new ClientState(this.settings)
        this.utils = new ClientUtils()
        this.buttons = new Buttons(this.utils, this.settings)
        this.clientEventHandler = new ClientEventHandler(this, this.clientState, this.utils)
        this.loadHandler = new LoadHandler(this.settings, this.clientState)
    }

    init(){
        utils.log("ClientHandler starting...")
        this.loadHandler.start()
    }




}

module.exports = ClientHandler