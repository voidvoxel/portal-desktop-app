const path = require("path");

const { App } = require("sogouda");

const SERVER_CONFIG = require("../../config/server.json");

class ApplicationDesktopClient extends App {

    constructor (options = {}) {
        options ??= {};

        let applicationImagePath = options.imagePath ?? ".";

        applicationImagePath = path.resolve(applicationImagePath);

        super(
            {
                debug: false,
                frameless: false,
                height: 480,
                title: "Portal Net",
                url: `http://127.0.0.1:${SERVER_CONFIG.port}`,
                width: 640
            }
        );
    }

    startSync () {
        super.startSync();
    }
}

module.exports = ApplicationDesktopClient;
