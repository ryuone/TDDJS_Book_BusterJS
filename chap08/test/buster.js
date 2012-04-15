/**
 * User: ryuone
 * Date: 12/04/04
 * License: MIT License
 */
var config = module.exports;

config["Node tests"] = {
    rootPath:"../../",
    sources:[
        "chap08/src/*.js"
    ],
    tests:[
        "chap08/test/*_test.js"
    ],
    environment:"node" // "browser" or "node"
};

config["Browser tests"] = {
    rootPath:"../../",
    sources:[
        "chap08/src/*.js"
    ],
    tests:[
        "chap08/test/*_test.js"
    ],
    environment:"browser" // "browser" or "node"
};
