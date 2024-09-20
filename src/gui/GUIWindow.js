const rl = require("raylib");

const Time = require("../Time");
const GUIContainer = require("./GUIContainer");


/**
 * The window of an `Application`.
 */
module.exports = class GUIWindow {
    /**
     * @type {rl.Camera3D}
     */
    #camera;

    /**
     * @type {GUIContainer}
     */
    #container;

    /**
     * @type {Time}
     */
    #time;

    /**
     * @type {number}
     */
    #width;

    /**
     * @type {number}
     */
    #height;

    /**
     * @type {string}
     */
    #title;

    /**
     * The main camera of this `GUIWindow`.
     */
    get camera() {
        return this.#camera;
    }

    get menu() {
        return this.#container;
    }

    /**
     * The height of the `GUIWindow`.
     */
    get height() {
        return rl.GetScreenHeight();
    }

    /**
     * Whether or not the `GUIWindow` is open.
     */
    get isOpen() {
        return !rl.WindowShouldClose();
    }

    /**
     * The time system of the `GUIWindow`.
     */
    get time() {
        return this.#time;
    }

    /**
     * The title of the `GUIWindow`.
     */
    get title() {
        return rl.SetWindowTitle();
    }

    /**
     * The width of the `GUIWindow`.
     */
    get width() {
        return rl.GetScreenWidth();
    }

    /**
     * @param {number} width
     * @param {number} height
     * @param {string} title
     */
    constructor (
        width,
        height,
        title
    ) {
        this.#width = width ??= 640;
        this.#height = height ??= 480;
        this.#title = title ??= "Portal";

        // Initialize the window.
        rl.InitWindow(width, height, title);

        this.#initializeCamera();
    }

    /**
     * Open the window.
     */
    async open() {
        this.#time = new Time();

        this.time.start(
            20,
            async delta => {
                await this.tick(delta);
                await this.draw();
            }
        );
    }

    /**
     * Run the tick logic of the `GUIWindow`.
     *
     * @param {number} delta
     * The amount of time elapsed since the previous application tick.
     */
    async tick(delta) {
    }

    /**
     * Draw the `GUIWindow`.
     */
    async draw() {
        if (!this.isOpen) {
            this.time.stop();
            rl.CloseWindow();
        }

        // Start rendering.
        rl.BeginDrawing();

        // Enter 3D mode.
        rl.BeginMode3D(this.camera);

        // Clear the background with black.
        rl.ClearBackground(rl.BLACK);

        // Draw the menu that is currently open.
        if (this.menu instanceof GUIContainer)
            this.menu.draw();

        // Exit 3D mode.
        rl.EndMode3D();

        // Stop rendering.
        rl.EndDrawing();
    }

    /**
     * Initialize the camera.
     */
    #initializeCamera() {
        // Create a new camera.
        this.#camera = {};

        // Move the camera to position (0, 0, 0).
        this.camera.position = {
            x: 0.0,
            y: 0.0,
            z: -5.0
        };

        // Ask the camera to look at the position.
        this.camera.target = {
            x: 0.0,
            y: 0.0,
            z: 0.0
        };

        // Reset the camera's rotation towards the target.
        this.camera.up = {
            x: 0.0,
            y: 1.0,
            z: 0.0
        };

        // Set the camera's field-of-view (FOV).
        this.camera.fovy = 60.0;

        // Default to orthographic projection.
        this.camera.projection = rl.CAMERA_ORTHOGRAPHIC;
    }
};
