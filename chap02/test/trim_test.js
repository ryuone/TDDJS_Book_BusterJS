if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
}

buster.testCase("String trim test", {
    "test trim should remove leading white-space":function () {
        assert("a string" === "   a string".trim(),
            "should remove leading white-space");
    },

    "test trim should remove trailing white-space":function () {
        assert("a string" === "a string   ".trim(),
            "should remove trailing white-space");
    }
});
