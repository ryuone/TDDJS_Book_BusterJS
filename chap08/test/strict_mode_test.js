if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var sinon = require("sinon");
}

buster.testCase("StrictModeTest", {
    "//(now no 'use strict') test repeated identifiers in parameters":function () {
        // Syntax error in ES5 strict mode
        function es3VsEs5(a, a, a) {
            //"use strict";
            return a;
        }

        // true in ES3
        assert.equals(6, es3VsEs5(2, 3, 6));
    }
});

function useStrictSwitchArgs(a, b) {
    "use strict";
    var c = b;
    b = a;
    a = c;

    return [].slice.call(arguments);
}

function switchArgs(a, b) {
    var c = b;
    b = a;
    a = c;

    return [].slice.call(arguments);
}

buster.testCase("ArgumentsParametersTest", {
    "test should not switch arguments":function () {
        // Passes on ES5 strict mode
        assert.equals([2, 3], useStrictSwitchArgs(2, 3));

        // Passes on ES3
        // assert.equals([2, 3], switchArgs(3, 2));
    },
    "test should switch arguments":function () {
        // Passes on ES5 not strict mode
        assert.equals([2, 3], switchArgs(3, 2));

        // Passes on ES3
        // assert.equals([2, 3], switchArgs(3, 2));
    }
});
