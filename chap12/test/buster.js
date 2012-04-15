/**
 * User: ryuone
 * Date: 12/04/05
 * License: MIT License
 */
var config = module.exports;

config["Browser tests"] = {
    environment:"browser", // "browser" or "node"
    rootPath:"../../",
    libs:[
        "chap12/lib/*.js"
    ],
    sources:[
        "chap12/src/*.js"
    ],
    tests:[
        "chap12/test/*test.js"
    ]
};
