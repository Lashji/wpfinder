const electron = require('electron');
const {
    ipcRenderer
} = electron;

const cancel_button = document.querySelector("#cancel");
const apply_button = document.querySelector("#apply");


cancel_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_without_saving");


});

apply_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_and_save");

});