import Field from "./field";

/**
 * Circular hitbox field
 * @class
 */
export default class RadialField extends Field {
    /**
     * RadialField constructor
     * @param {Position} position - Position relative to the container
     * @param {Number} radius - Length of the field's radius in pixel
     * @param {FieldOptions} options - Field's options
     */
    constructor (position, radius = 0, options) {
        super(position, options);
        this.radius = radius;
    }

    /**
     * @inheritDoc
     * @return {Position}
     */
    hit (other) {
        if (other instanceof RadialField) {
            const position = this.getPosition();
            const otherPosition = other.getPosition();
            const distance = position.distance(otherPosition);
            const field = other.options.isReversed ? other.radius - this.radius : this.radius + other.radius;
            if (other.options.isReversed ? distance > field : distance < field) {
                return position
                    .subtract(otherPosition)
                    .multiply(((field - distance) * this.options.restitution) / distance);
            }

            return null;
        }

        return super.hit(other);
    }
}
