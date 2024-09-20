module.exports = class Time {
    /**
     * @type {number}
     */
    #current = 0;

    /**
     * @type {number}
     */
    #delta = 0;

    /**
     * @type {number}
     */
    #origin = 0;

    /**
     * @type {number}
     */
    #previous = 0;

    /**
     * @type {Function | null}
     */
    #tickCallback = null;

    /**
     * @type {number | null}
     */
    #tickInterval = null;

    /**
     * @type {number}
     */
    #tickRate = 20;

    /**
     * The current time.
     */
    get current() {
        return this.#current;
    }

    /**
     * The amount of time (in milliseconds) since the previous tick.
     */
    get delta() {
        return this.#delta;
    }

    /**
     * The origin time at which the Time system was initialized.
     */
    get origin() {
        return this.#origin;
    }

    /**
     * The time of the previous tick.
     */
    get previous() {
        return this.#previous;
    }

    /**
     * The tick rate (in ticks per second).
     */
    get tickRate() {
        return this.#tickRate;
    }

    set tickRate(value) {
        // Default the value to 20.
        value = typeof value === "number" ? value : 20;

        // If the value is not a safe integer, throw an error.
        if (!Number.isSafeInteger(value) || value < 1 || value > 1000)
            throw new Error("Tick rate must be a valid integer between 1 and 1000.");

        // Round the value.
        value = Math.round(value);

        // Set the value to at least 1.
        value = Math.max(1, value);

        // Set the value to at most 1000.
        value = Math.min(1000, value);

        // Update the tick rate to the value.
        this.#tickRate = value;

        // If the tick interval is currently set, clear it.
        if (this.#tickInterval != null) {
            clearInterval(this.#tickInterval);
        }

        // Set the interval.
        this.#tickInterval = setInterval(
            this.#tickIntervalCallback,
            this.#tickIntervalRate
        );
    }

    /**
     * @returns {Function}
     */
    get #tickIntervalCallback() {
        return (() => this.#tick());
    }

    get #tickIntervalRate() {
        return 1000 / this.tickRate;
    }

    /**
     * Start the time system.
     *
     * @param {number} tickRate
     * The rate, in ticks-per-second (TPS), of the time system.
     * @param {Function} tickCallback
     * The function to call each tick.
     */
    start(tickRate=20, tickCallback=null) {
        if (typeof tickRate !== "number")
            tickRate = DEFAULT_TICK_RATE;

        if (typeof tickCallback !== "function")
            tickCallback = () => undefined;

        // Set the tick callback.
        this.#tickCallback = tickCallback;

        // Set the origin of the Time system to the time it was initialized.
        this.#origin = Date.now();

        // Initialize the previous and current time to the origin.
        this.#previous = this.#current = this.origin;

        // Initialize the delta time to 0.
        this.#delta = 0;

        // Set the tick rate and start the tick interval.
        this.tickRate = tickRate;
    }

    /**
     * Stop the time system.
     */
    stop() {
        clearInterval(this.#tickInterval);
    }

    /**
     * Update all times kept by the Time system.
     */
    #tick() {
        // Update the previous time.
        this.#updatePreviousTime();

        // Update the current time.
        this.#updateCurrentTime();

        // Update the delta time.
        this.#updateDeltaTime();

        // Invoke the callback.
        this.#tickCallback();
    }

    #updateCurrentTime() {
        this.#current = Date.now();
    }

    #updateDeltaTime() {
        this.#delta = this.current - this.origin;
    }

    #updatePreviousTime() {
        this.#previous = this.#current;
    }
};
