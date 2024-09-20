/**
 * A GUI component.
 */
module.exports = class GUIComponent {
    /**
     * Returns whether `component` is a valid `GUIComponent`.
     * @param {GUIComponent} component
     * The component to validate.
     *
     * @returns {boolean}
     * Whether `component` is a valid `GUIComponent`.
     */
    static isValid(component) {
        if (typeof component === "undefined" || component === null)
            return false;

        return typeof component === "object" && component instanceof GUIComponent;
    }

    static assertIsValid(component) {
        if (!this.isValid(component))
            throw new Error(`Invalid component type "${component.toString()}".`);
    }

    /**
     * Contains the logic for the tick event of this `GUIComponent`.
     *
     * @param {number} delta
     * The amount of time elapsed since the last tick.
     */
    async tick(delta) {}

    /**
     * Draw this `GUIComponent`.
     */
    async draw() {}
};
