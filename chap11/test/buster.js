/**
 * User: ryuone
 * Date: 12/04/05
 * License: MIT License
 */
var config = module.exports;

config["Browser tests"] = {
    rootPath:"../../",
    libs:[
        "chap11/lib/*.js"
    ],
    sources:[
        "chap11/src/*.js"
    ],
    tests:[
        "chap11/test/*_test.js"
    ],
    environment:"browser" // "browser" or "node"
};
config["Node tests"] = {
    rootPath:"../../",
    libs:[
        "chap11/lib/*.js"
    ],
    sources:[
        "chap11/src/*.js"
    ],
    tests:[
        "chap11/test/*_test.js"
    ],
    environment:"node" // "browser" or "node"
};
