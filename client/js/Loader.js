const request = require("request")
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
        this.settings.albums.forEach((i) => {
            this.handleRequest(i)
        })

        console.log("load function ", this.images)
        this.state.addImages(this.parseResponse(this.images))

    }

    async handleRequest(link) {

        let options = {
            url: link,
            headers: {
                'Authorization': "Client-ID 4abb3979dc91311"
            }
        }
        let data;

        request(options, (err, res, body) => {
            let resBody

            if (!err && res.statusCode == 200) {

                resBody = JSON.parse(body)
                console.log(resBody)
                data = this.parseResponse(resBody)


                if (this.images.length === 0) {
                    console.log(this.images)
                    this.images = new Array(data)
                } else {
                    this.images.concat([data])
                }
                ipcRenderer.send("event:load_push", this.parseResponse(data))
            }

        })


    }

    parseResponse(body) {
        // change this 
        return body
    }
}


module.exports = Loader