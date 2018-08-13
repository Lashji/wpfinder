const request = require("request")
const electron = require("electron")
const {
    ipcRenderer 
} = electron

class Loader {

    constructor(state, settings) {
        this.state = state
        this.settings = settings
    }


    load() {
        this.settings.albums.forEach((i) => {
            this.handleRequest(i)
        })        

    }

    handleRequest(link) {

        let options = {
            url: link,
            headers: {
                'Authorization': "Client-ID 4abb3979dc91311"
            }
        }

        request(options, (err, res, body) => {
            let resBody

            if (!err && res.statusCode == 200) {
                
                resBody = JSON.parse(body)
                console.log(resBody)
            }

            let images = this.parseResponse(resBody)

            this.state.addImages(images)
            ipcRenderer.send("event:load_push", this.parseResponse(images))
        })


    }

    parseResponse(body){
        // change this
        return this.body
    }
}


module.exports = Loader