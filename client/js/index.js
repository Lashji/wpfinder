
const electron = require("electron");
const {
    ipcRenderer
} = electron;
console.log(__dirname);
const ClientHandler = require("./js/ClientHandler.js")

const handler = new ClientHandler()
