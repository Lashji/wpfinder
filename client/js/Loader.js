const electron = require("electron")
const {
    ipcRenderer
} = electron

class Loader {

    constructor(state, settings) {
        this.state = state
        this.settings = settings
        this.images = []
    }


    load() {

        let len = this.settings.albums.length
        for (let i = 0; i < len; i++) {
            if (i === len - 1) {
                this.handleRequest(this.settings.albums[i], true)
            } else {
                this.handleRequest(this.settings.albums[i], false)
            }
        }


        // this.settings.albums.forEach((i) => {
        //     this.handleRequest(i)
        // })

    }

    handleRequest(link, finalRequest) {
        fetch(link, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Authorization': "Client-ID 4abb3979dc91311"
            },
        }).then((response) => {
            let data = response.json()

            return data
        }, (error) => {
            console.log(error.message)
        }).then((data) => {
            console.log(data)
            data = this.parseResponse(data)
            ipcRenderer.send('event:load_push', data)
            
        }).then(() => {
            if (finalRequest) {
                ipcRenderer.send("event:load_done")
            }
        })


    }

    parseResponse(body) {
        console.log("parseresponse: body ", body)
        // change this 

        // let newObj = {
        //     title: data.title,
        //     album: data.id,
        //     images: data.images
        // }




        // console.log("parse Response body", newObj)

        return body
    }


}


module.exports = Loader