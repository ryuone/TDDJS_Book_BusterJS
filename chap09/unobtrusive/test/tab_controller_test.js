if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var sinon = require("sinon");
}

(function () {
    var tabController = tddjs.ui.tabController;

    // All test cases can share this setUp
    function setUp() {
        this.tabs = document.getElementById("tabs");
    }

    buster.testCase("TabControllerCreateTest", {
        setUp:setUp,

        "test should fail without element":function () {
            assert.exception(function () {
                tabController.create();
            }, "TypeError");
        },

        "test should fail without element class":function () {
            assert.exception(function () {
                tabController.create({});
            }, "TypeError");
        },

        "should return object":function () {
            var controller = tabController.create(this.tabs);

            assert.isObject(controller);
        },

        "test should add js-tabs class name to element":function () {
            var tabs = tabController.create(this.tabs);

            assert.className(this.tabs, "js-tab-controller");
        }

        // Test for event handlers, explained later
    });

    buster.testCase("TabbedControllerActivateTabTest", {
        setUp:function () {
            setUp.call(this);
            this.controller = tabController.create(this.tabs);
            this.links = this.tabs.getElementsByTagName("a");
            this.lis = this.tabs.getElementsByTagName("li");
        },

        "test should not fail without anchor":function () {
            var controller = this.controller;

            refute.exception(function () {
                controller.activateTab();
            });
        },

        "test should mark anchor as active":function () {
            this.controller.activateTab(this.links[0]);

            assert.className(this.links[0], "active-tab");
        },

        "test should deactivate previous tab":function () {
            this.controller.activateTab(this.links[0]);
            this.controller.activateTab(this.links[1]);

            refute.match(this.links[0], /(^|\s)active-tab(\s|$)/);
            assert.className(this.links[1], "active-tab");
        },

        "test should not activate unsupported element types":function () {
            this.controller.activateTab(this.links[0]);
            this.controller.activateTab(this.lis[0]);

            refute.match(this.lis[0], /(^|\s)active-tab(\s|$)/);
            assert.className(this.links[0], "active-tab");
        },

        "test should fire onTabChange":function () {
            var actualPrevious, actualCurrent;
            this.controller.activateTab(this.links[0]);
            this.controller.onTabChange = function (curr, prev) {
                actualPrevious = prev;
                actualCurrent = curr;
            };

            this.controller.activateTab(this.links[1]);

            assert.same(actualPrevious, this.links[0]);
            assert.same(actualCurrent, this.links[1]);
        }
    });
}());
