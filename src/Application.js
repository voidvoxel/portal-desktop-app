const { EventEmitter } = require("events");

const rl = require("raylib");

const { GUIWindow } = require("./gui");
const Time = require("./Time");


class Application {
    /**
     * @type {ApplicationWindow}
     */
    #window;

    /**
     * The `GUIWindow` of this `Application`.
     *
     * @type {GUIWindow}
     */
    get window() {
        return this.#window;
    }

    constructor() {
        this.#window = new GUIWindow();
    }

    /**
     * Start this `Application`.
     */
    async start() {
        // Open the `GUIWindow`.
        await this.window.open();
    }
}


module.exports = Application;
