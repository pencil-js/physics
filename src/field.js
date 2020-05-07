/**
 * Super class for hitbox field
 * @class
 */
export default class Field {
    /**
     * Field constructor
     * @param {Position} position - Position relative to the container
     * @param {FieldOptions} options - Field's options
     */
    constructor (position, options) {
        this.position = position;
        this.options = {
            ...Field.defaultOptions,
            ...options,
        };
        this.parent = null;
    }

    /**
     * Set the holding container of this field
     * @param {Container} parent - Any Pencil Container
     * @return {Field} Itself
     */
    setParent (parent) {
        this.parent = parent;
        return this;
    }

    /**
     * Get the absolute position of this field
     * @return {Position}
     */
    getPosition () {
        return this.parent.position.clone().add(this.position);
    }

    /**
     * Return the force resulting from both field
     * @param {Field} other - Any Field
     */
    hit (other) {
        throw new Error(`Unimplemented 'hit' method for [${this.constructor.name}] on [${other.constructor.name}].`);
    }

    /**
     * @typedef {Object} FieldOptions
     * @prop {Number} restitution - Strength of collision
     * @prop {Boolean} isReversed - Act in the opposite way
     */
    /**
     * Default value for field's options
     * @return {FieldOptions}
     */
    static get defaultOptions () {
        return {
            restitution: 0.4,
            isReversed: false,
        };
    }
}
