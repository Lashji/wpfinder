const electron = require('electron');
const {
    ipcRenderer
} = electron;

const cancel_button = document.querySelector("#cancel");
const apply_button = document.querySelector("#apply");
const settings_home = document.querySelector('#settings-home');
const main = document.querySelector('#top');



settings_home.addEventListener('click', () => {
    applyHTML("settings_home.html");
});


cancel_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_without_saving");


});

apply_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_and_save");

});


function applyHTML(template) {
    main.innerHTML = `<object type="text/html" data="${__dirname}/html/templates/${template}"></object>`;
}