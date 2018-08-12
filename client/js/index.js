
const electron = require("electron");
const {
    ipcRenderer
} = electron;
const ClientHandler = require("./ClientHandler.js")

const handler = new ClientHandler()
handler.init()
