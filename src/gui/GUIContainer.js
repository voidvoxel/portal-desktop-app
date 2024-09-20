const GUIComponent = require("./GUIComponent");

/**
 * A container that can hold multiple components (`GUIComponent`).
 */
module.exports = class GUIContainer extends GUIComponent {
    /**
     * @type {GUIComponentTable}
     */
    #components = new GUIComponentTable();

    get components() {
        return this.#components;
    }

    /**
     * Add a `GUIComponent` to this `GUIContainer`.
     *
     * @param  {...GUIComponent} components
     * A list of components to add.
     */
    addComponent(...components) {
        for (const component of components) {
            if (typeof component === "undefined" || component === null)
                continue;

            GUIComponent.assertIsValid(component);

            this.components.setComponent(component);
        }
    }

    /**
     * Get a `GUIComponent` by its ID.
     *
     * @param {string} componentId
     * The ID of the component to get.
     *
     * @returns {GUIComponent}
     */
    getComponentById(componentId) {
        return this.components.getComponent[componentId];
    }

    /**
     * Remove a `GUIComponent` from this `GUIContainer`.
     *
     * @param  {...GUIComponent} components
     * A list of components to remove.
     */
    removeComponent(...components) {
        for (const component of components) {
            if (typeof component === "undefined" || component === null)
                continue;

            GUIComponent.assertIsValid(component);

            this.components.removeComponent(component);
        }
    }
};
