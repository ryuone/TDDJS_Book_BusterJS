if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var sinon = require("sinon");
    var Circle = require("../src/circle");
}

buster.testCase("CircleTest", {
    "test Object.create backed constructor":function () {
        var circle = new Circle(3);

        assert(circle instanceof Circle);
        assert.equals(6, circle.diameter);

        circle.radius = 6;
        assert.equals(12, circle.diameter);

        delete circle.radius;
        assert.equals(6, circle.radius);
    },

    "test omitting new when creating circle":function () {
        var circle = Circle(3);

        assert(circle instanceof Circle);
        assert.equals(6, circle.diameter);
    },

    "test using a custom create method":function () {
        var circle = Object.create({}, {
            diameter:{
                get:function () {
                    return this.radius * 2;
                }
            },

            circumference:{ /* ... */ },
            area:{ /* ... */ },

            create:{
                value:function (radius) {
                    var circ = Object.create(this, {
                        radius:{ value:radius }
                    });

                    return circ;
                }
            }
        });

        var myCircle = circle.create(3);

        assert.equals(6, myCircle.diameter);
        assert(circle.isPrototypeOf(myCircle));

        // circle is not a function
        assert.exception(function () {
            refute(myCircle instanceof circle);
        });
    }
});
