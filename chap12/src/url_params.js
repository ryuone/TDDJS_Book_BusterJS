/*jslint indent: 2, browser: true, eqeqeq: false*/
/*globals tddjs*/
if (typeof require == "function" && typeof module == "object") {
    var tddjs = require("../lib/tdd");
}

(function () {
    if (typeof encodeURIComponent == "undefined") {
        return;
    }

    function urlParams(object) {
        if (!object) {
            return "";
        }

        if (typeof object == "string") {
            return encodeURI(object);
        }

        var pieces = [];

        tddjs.each(object, function (prop, val) {
            pieces.push(encodeURIComponent(prop) + "=" +
                encodeURIComponent(val));
        });

        return pieces.join("&");
    }

    tddjs.namespace("util").urlParams = urlParams;
}());
