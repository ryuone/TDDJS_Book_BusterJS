/**
 * User: ryuone
 * Date: 12/04/04
 * License: MIT License
 */
var config = module.exports;

config["base"] = {
    rootPath:"../../../",
    libs:[
        "chap09/unobtrusive/lib/*.js"
    ],
    sources:[
        "chap09/unobtrusive/src/*.js"
    ],
    tests:[
        "chap09/unobtrusive/test/*_test.js"
    ]
};

config["Browser tests"] = {
    extends:"base",
    "resources": [{
        "path": "/",
        "file": __dirname + "/fixtures/tabs.html",
        "headers": {
            "Content-Type": "text/html"
        }
    }],
    environment:"browser" // "browser" or "node"
};
