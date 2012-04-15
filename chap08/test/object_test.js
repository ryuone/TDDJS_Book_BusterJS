if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var sinon = require("sinon");
}

buster.testCase("ES5ObjectTest", {
    "test defineProperty":function () {
        var circle = {};

        Object.defineProperty(circle, "radius", {
            value:4,
            writable:false,
            configurable:false
        });

        assert.equals(4, circle.radius);
    },

    "test changing a property descriptor":function () {
        var circle = { radius:3 };
        var descriptor =
            Object.getOwnPropertyDescriptor(circle, "radius");
        descriptor.configurable = false;
        Object.defineProperty(circle, "radius", descriptor);
        delete circle.radius;

        // Non-configurable radius cannot be deleted
        assert.equals(3, circle.radius);
    },

    "test es3 inheritance via constructors":function () {
        var circle = { /* ... */ };

        function CircleProxy() {
        }

        CircleProxy.prototype = circle;

        var sphere = new CircleProxy();

        assert(circle.isPrototypeOf(sphere));
    },

    "test inheritance, es5 style":function () {
        var circle = { /* ... */ };
        var sphere = Object.create(circle);

        assert(circle.isPrototypeOf(sphere));
        assert.equals(circle, Object.getPrototypeOf(sphere));
    },

    "test Object.create with properties":function () {
        var circle = { /* ... */ };

        var sphere = Object.create(circle, {
            radius:{
                value:3,
                writable:false,
                configurable:false,
                enumerable:true
            }
        });

        assert.equals(3, sphere.radius);
    },

    "test inheritance via proprietary __proto__":function () {
        var circle = { /* ... */ };
        var sphere = {};
        sphere.__proto__ = circle;

        assert(circle.isPrototypeOf(sphere));
    },

    "test property accessors":function () {
        var circle = {};

        Object.defineProperty(circle, "diameter", {
            get:function () {
                return this.radius * 2;
            },

            set:function (diameter) {
                if (isNaN(diameter)) {
                    throw new TypeError("Diameter should be a number");
                }

                this.radius = diameter / 2;
            }
        });

        circle.radius = 4;

        assert.equals(8, circle.diameter);

        circle.diameter = 3;

        assert.equals(3, circle.diameter);
        assert.equals(1.5, circle.radius);

        assert.exception(function () {
            circle.diameter = {};
        });
    }
});
