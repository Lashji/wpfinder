const electron = require('electron');
const {
    ipcRenderer
} = electron;

const cancel_button = document.querySelector("#cancel");
const apply_button = document.querySelector("#apply");
const settings_home = document.querySelector('#settings-home');
const settings_list = document.querySelector("#settings-list");
const settings_conf = document.querySelector("#settings-conf");
const main = document.querySelector('#top');



settings_home.addEventListener('click', () => {
    applyHTML("settings_home.html");
});


settings_list.addEventListener('click', () => {
    applyHTML("settings_list.html");
});


settings_conf.addEventListener('click', () => {
    applyHTML("settings_conf.html");
});


cancel_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_without_saving");


});

apply_button.addEventListener('click', () => {

    ipcRenderer.send("event:exit_and_save");

});


function applyHTML(template) {
    clearHTML();
    main.innerHTML = `<object type="text/html" data="${__dirname}/html/templates/${template}"></object>`;
}

function clearHTML() {
    const template = main.childNodes;
    template.forEach(n => {
        console.log(n)
        n = null;
    });

}