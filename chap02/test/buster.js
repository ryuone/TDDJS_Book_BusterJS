/**
 * User: ryuone
 * Date: 12/04/08
 * License: MIT License
 */
var config = module.exports;

config["Node tests"] = {
    rootPath:"../../",
    sources:[
        "chap02/src/*.js"
    ],
    tests:[
        "chap02/test/*_test.js"
    ],
    environment:"node" // "browser" or "node"
};

config["Browser tests"] = {
    rootPath:"../../",
    sources:[
        "chap02/src/*.js"
    ],
    tests:[
        "chap02/test/*_test.js"
    ],
    environment:"browser" // "browser" or "node"
};
