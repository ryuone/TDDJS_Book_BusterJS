if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var tddjs = require("../lib/tdd");
}
buster.testCase("AjaxCreateTest", {
    "test should return XMLHttpRequest object":function () {
        var xhr = tddjs.ajax.create();

        assert.isNumber(xhr.readyState);
        assert(tddjs.isHostMethod(xhr, "open"));
        assert(tddjs.isHostMethod(xhr, "send"));
        assert(tddjs.isHostMethod(xhr, "setRequestHeader"));
    }
});
