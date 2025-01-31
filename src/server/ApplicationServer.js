const express = require("express");

const SERVER_CONFIG = require("../../config/server.json");

class ApplicationServer {
    #express = express();

    constructor () {
        // this.#express.get("/*", this.getRoute);
        this.#express.get("/", this.getRoute);
    }

    getRoute (request, response, next) {
        response.end("Wow\n");
    }

    startSync () {
        console.log(`Server starting at 127.0.0.1:${SERVER_CONFIG.port}`);

        this.#express.listen(SERVER_CONFIG.port);
    }
}

module.exports = ApplicationServer;
