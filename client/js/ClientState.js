class ClientState {

    constructor(settings) {
        this.settings = settings
        this.state = {
            maximized: false
        }
    }

    setMaximized(val) {
        this.state.maximized = val
    }

    maximized() {
        return this.state.maximized
    }

}

module.exports = ClientState