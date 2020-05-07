# @pencil.js/physics

Strip-down physics engine plugin for [Pencil.js](https://github.com/pencil-js/pencil.js).


## Install

    npm install @pencil.js/physics


## Usage

```js
import physics from "@pencil.js/physics";
import Pencil from "pencil.js";

Pencil.use(physics);

const element = new Pencil.Circle();
element.setHitBox(<[field]>);
element.physics(() => element.hit(<otherElement>), <[airFriction]>);
```


## Example

Let's see a complete example using `@pencil.js/physics`:

```js
import physics from "@pencil.js/physics";
import { use, Position, Scene, Circle } from "pencil.js";

// Declare plugin
use(physics);

// Useful constants
const gravity = new Position(0, 0.2);
const friction = 0.005;

// Basic Pencil.js scene
const scene = new Scene();
const balls = [];
for (let i = 0; i < 30; ++i) {
    const ball = new Circle(scene.getRandomPosition(), 100);
    // Attach a radial hit-box to each ball
    ball.setHitBox();
    balls.push(ball);
}

// Function that return all forces applied on component
function getForces () {
    const forces = new Position();

    // Add constant gravity
    forces.add(gravity);

    // Add each ball push back on each other
    balls.forEach((other) => {
        if (other !== this) {
            const pushBack = this.hit(other);
            forces.add(pushBack);
        }
    });

    return forces;
}

// Setup
scene
    .add(...balls)
    .startLoop()
    .on("draw", () => {
        balls.forEach((ball) => {
            ball.physics(getForces, friction);
        });
    }, true);
```


## License

[MIT](license)
