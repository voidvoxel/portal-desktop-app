const { ApplicationDesktopClient } = require("./client");
const { ApplicationServer } = require("./server");

class DesktopApplication {
    #client = new ApplicationDesktopClient();
    #server = new ApplicationServer();

    get client () {
        return this.#client;
    }

    get server () {
        return this.#server;
    }

    constructor () {
    }

    startSync () {
        // Start the server.
        this.server.startSync();

        // Start the client.
        this.client.startSync();
    }
}

module.exports = DesktopApplication;
