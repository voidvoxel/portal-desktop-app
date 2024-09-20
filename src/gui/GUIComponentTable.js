const GUIComponent = require("./GUIComponent");

/**
 * A lookup table used to store multiple of `GUIComponent` within a `GUIContainer`.
 */
module.exports = class GUIComponentTable {
    /**
     *
     * @param {string} componentId
     * The ID of the component to get.
     * @returns {GUIComponent}
     */
    getComponent(componentId) {
        return this[componentId];
    }

    removeComponent(component) {
        delete this[component.id];
    }

    setComponent(component) {
        this[component.id] = component;
    }
};
