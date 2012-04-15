/**
 * User: ryuone
 * Date: 12/04/01
 * License: MIT License
 */
var config = module.exports;

config["Node tests"] = {
    rootPath: "../../",
    environment: "node", // "browser" or "node"
    sources: [
        "chap01/src/strftime.js"
    ],
    tests: [
        "chap01/test/*test.js"
    ]
};
config["Browser tests"] = {
    rootPath: "../../",
    environment: "browser", // "browser" or "node"
    sources: [
        "chap01/src/strftime.js"
    ],
    tests: [
        "chap01/test/*test.js"
    ]
};
