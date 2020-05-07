import { name } from "../package.json";
import RadialField from "./radial-field";

const previousPositionKey = Symbol("previousPosition");
const fieldKey = Symbol("field");

export default {
    name,
    install: (Pencil) => {
        const { Container, Position, Circle } = Pencil;
        /**
         * Apply Verlet integration
         * @param {Function} getForces - Function that return the sum of all forces acting on the container
         * @param {Number} [airFriction=0.005] - Friction of the air
         * @return {Container} Itself
         */
        Container.prototype.physics = function physics (getForces, airFriction = 0.005) {
            const previous = this.position.clone();

            if (this[previousPositionKey]) {
                const speed = this.position.clone()
                    .subtract(this[previousPositionKey])
                    .multiply(1 - airFriction);
                this.position.add(speed);
            }

            this.position.add(getForces.call(this));

            this[previousPositionKey] = previous;

            return this;
        };

        /**
         * Set position without motion
         * @param {Position} position - Any position
         * @return {Container} Itself
         */
        Container.prototype.setPosition = function setPosition (position) {
            this.position.set(position);
            if (this[previousPositionKey]) {
                this[previousPositionKey].set(position);
            }
            return this;
        };

        /**
         * Set this container's hit box
         * @param {Field} [field] -
         * @return {Container} Itself
         */
        Container.prototype.setHitbox = function setHitbox (field) {
            if (field === undefined) {
                switch (true) {
                    case (this instanceof Circle):
                        field = new RadialField(undefined, this.radius);
                        break;
                }
            }
            this[fieldKey] = field;
            field.setParent(this);
            return this;
        };

        /**
         * Compute push back between two container
         * @param {Container|Field} other - Another container or hitbox field
         * @return {Position}
         */
        Container.prototype.hit = function hit (other) {
            return Position.from(this[fieldKey].hit(other[fieldKey] || other, Pencil) || undefined);
        };
    },
};

export {
    RadialField,
};
