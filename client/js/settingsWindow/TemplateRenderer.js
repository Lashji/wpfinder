const electron = require("electron")
const {
    ipcRenderer
} = electron


class TemplateRenderer {

    constructor(hook, settings) {

        this.hook = hook
        this.settings = settings
    }

    renderTemplate(template) {

        switch (template) {
            case "list":
                this.renderList();
                break;

        }


        this.applyEventListeners(template)

    }

    renderList(template) {

        this.clearHook()

        let maindiv = document.createElement("div")
        maindiv.setAttribute("class", "maindiv")
        let frag = document.createDocumentFragment()
        let form = document.createElement("form")
        let ul = document.createElement("ul")
        ul.setAttribute("class", "settings-list-ul")
        form.setAttribute("class", "settings-form")


        for (let i = 0; i < this.settings.albums.length; ++i) {

            let li = document.createElement("li")
            li.setAttribute("class", "settings-list-item")
            li.innerHTML = this.settings.albums[i]

            ul.appendChild(li)
        }


        form.appendChild(this.getFormItems())
        maindiv.appendChild(ul)
        maindiv.appendChild(form)
        frag.appendChild(maindiv)
        this.hook.appendChild(frag)

    }

    getFormItems() {
        let frag = document.createDocumentFragment()
        let inp = document.createElement("input")
        let items = document.createElement("div")
        inp.setAttribute("type", "text")
        inp.setAttribute("class", "settings-form-input")
        inp.setAttribute("id", "link-input")

        let button = document.createElement("input")
        button.setAttribute("type", "button")
        button.setAttribute("value", "Add")
        button.setAttribute("id", "addbutton")



        items.setAttribute("class", "form-items")

        items.appendChild(inp)
        items.appendChild(button)
        frag.appendChild(items)

        return frag
    }

    addListItem(item, settings) {
        settings.albums.push(item)
        console.log(settings.albums)
    }


    clearHook() {

        for (let i = 0; i < this.hook.childNodes.length; ++i) {

            this.hook.removeChild(this.hook.childNodes[i])

        }

    }

    applyEventListeners(template) {
        const addButton = document.querySelector("#addbutton");
        const inputfield = document.querySelector("#link-input");
        let settings = this.settings


        addButton.addEventListener('click', () => {

            this.addListItem(inputfield.value, settings)
            this.renderTemplate(template)
        })

    }

}



module.exports = TemplateRenderer