
const electron = require("electron");
const {
    ipcRenderer
} = electron;
const ClientHandler = require("./js/ClientHandler.js")

const handler = new ClientHandler()
