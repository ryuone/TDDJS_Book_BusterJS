if (typeof require == "function" && typeof module == "object") {
    var tddjs = require("../lib/tdd");
}

(function () {
    var xhr;
    var ajax = tddjs.namespace("ajax");

    var options = [
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },

        function () {
            return new XMLHttpRequest();
        }
    ];

    for (var i = 0, l = options.length; i < l; i++) {
        try {
            xhr = options[i]();

            if (typeof xhr.readyState == "number" &&
                tddjs.isHostMethod(xhr, "open") &&
                tddjs.isHostMethod(xhr, "send") &&
                tddjs.isHostMethod(xhr, "setRequestHeader")) {
                ajax.create = options[i];
                break;
            }
        } catch (e) {
        }
    }
}());
