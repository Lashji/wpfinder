const request = require("request")
const electron = require("electron")
const {
    ipcRenderer 
} = electron

class Loader {

    constructor(settings) {
        this.settings = settings
    }


    load() {

        settings.albums.forEach((i) => {
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

            ipcRenderer.send("event:load_push", this.parseResponse(resBody))
        })


    }

    parseResponse(body){
        // change this
        return this.body
    }
}


module.exports = Loader