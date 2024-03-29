if (typeof require == "function" && typeof module == "object") {
    var buster = require("buster");
    var tddjs = require("../lib/tdd");
    var fakeXMLHttpRequest = require("../lib/fake_xhr").fakeXMLHttpRequest;
}

(function () {
    var ajax = tddjs.ajax;

    function forceStatusAndReadyState(xhr, status, rs) {
        var success = sinon.stub();
        var failure = sinon.stub();

        ajax.get("/url", {
            success:success,
            failure:failure
        });

        xhr.status = status;
        xhr.readyStateChange(rs);

        return {
            success:success.called,
            failure:failure.called
        };
    }

    function setUp() {
        this.tddjsUrlParams = tddjs.util.urlParams;
        this.tddjsIsLocal = tddjs.isLocal;
        this.ajaxCreate = ajax.create;
        this.xhr = Object.create(fakeXMLHttpRequest);
        ajax.create = sinon.stub().returns(this.xhr);
    }

    function tearDown() {
        tddjs.util.urlParams = this.tddjsUrlParams;
        tddjs.isLocal = this.tddjsIsLocal;
        ajax.create = this.ajaxCreate;
        fakeXMLHttpRequest.open = sinon.spy();
        fakeXMLHttpRequest.send = sinon.spy();
    }

    buster.testCase("RequestTest", {
        setUp:setUp,
        tearDown:tearDown,

        "test should use specified request method":function () {
            ajax.request("/uri", { method:"POST" });

            assert.equals("POST", this.xhr.open.args[0][0]);
        },

        "test should throw error without url":function () {
            assert.exception(function () {
                ajax.request();
            }, "TypeError");
        },

        "test should obtain an XMLHttpRequest object":function () {
            ajax.request("/url");

            assert(ajax.create.called);
        },

        "test should call open with method, url, async flag":function () {
            var url = "/url";
            ajax.request(url);

            assert.equals(["GET", url, true], this.xhr.open.args[0]);
        },

        "test should add onreadystatechange handler":function () {
            ajax.request("/url");

            assert.isFunction(this.xhr.onreadystatechange);
        },

        "test should call send":function () {
            ajax.request("/url");

            assert(this.xhr.send.called);
        },

        "test should encode data":function () {
            tddjs.util.urlParams = sinon.spy();
            var object = { field1:"13", field2:"Lots of data!" };

            ajax.request("/url", { data:object, method:"POST" });

            assert.calledWith(tddjs.util.urlParams, object);
        },

        "test should send data with send() for POST":function () {
            var object = { field1:"$13", field2:"Lots of data!" };
            var expected = tddjs.util.urlParams(object);

            ajax.request("/url", { data:object, method:"POST" });

            assert.calledWith(this.xhr.send, expected);
        },

        "test should send data on URL for GET":function () {
            var url = "/url";
            var object = { field1:"$13", field2:"Lots of data!" };
            var expected = url + "?" + tddjs.util.urlParams(object);

            ajax.request(url, { data:object, method:"GET" });

            assert.equals(expected, this.xhr.open.args[0][1]);
        },

        "test should append data on URL for GET":function () {
            var url = "/url?id=13";
            var object = { field1:"$13", field2:"Lots of data!" };
            var expected = url + "&" + tddjs.util.urlParams(object);

            ajax.request(url, { data:object, method:"GET" });

            assert.equals(expected, this.xhr.open.args[0][1]);
        }
    });

    buster.testCase("RequestHeadersTest", {
        setUp:function () {
            setUp.call(this);
            this.options = {
                method:"POST",
                data:{
                    field:"value"
                }
            };
        },

        tearDown:tearDown,

        "test should use default Content-Type header for POST":function () {
            ajax.request("/url", this.options);
            var name = "Content-Type";
            var type = "application/x-www-form-urlencoded";

            assert.equals(type, this.xhr.headers[name]);
        },

        "test should use default Content-Length header for POST":function () {
            ajax.request("/url", this.options);
            var name = "Content-Length";
            var length = 11;

            assert.equals(length, this.xhr.headers[name]);
        },

        "test should set X-Requested-With":function () {
            ajax.request("/url", this.options);
            var name = "X-Requested-With";
            var requestedWith = "XMLHttpRequest";

            assert.equals(requestedWith, this.xhr.headers[name]);
        },

        "test should not override provided Content-Type":function () {
            ajax.request("/url", {
                method:"POST",
                data:{
                    field:"value"
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });

            var name = "Content-Type";
            var type = "application/json";

            assert.equals(type, this.xhr.headers[name]);
        },

        "test should not override provided Content-Length":function () {
            ajax.request("/url", {
                method:"POST",
                data:{
                    field:"value"
                },
                headers:{
                    "Content-Length":47
                }
            });

            var name = "Content-Length";
            var length = 47;

            assert.equals(length, this.xhr.headers[name]);
        },

        "test should not override provided X-RequestedWith":function () {
            ajax.request("/url", {
                method:"POST",
                data:{
                    field:"value"
                },
                headers:{
                    "X-Requested-With":"JavaScript"
                }
            });

            var name = "X-Requested-With";
            var requestedWith = "JavaScript";

            assert.equals(requestedWith, this.xhr.headers[name]);
        },

        "test should set arbitrary headers":function () {
            ajax.request("/url", {
                method:"POST",
                data:{
                    field:"value"
                },
                headers:{
                    "Accept":"*/*"
                }
            });

            var name = "Accept";
            var accept = "*/*";

            assert.equals(accept, this.xhr.headers[name]);
        }
    });

    buster.testCase("GetRequestTest", {
        setUp:setUp,
        tearDown:tearDown,

        "test should define get method":function () {
            assert.isFunction(ajax.get);
        }
    });

    buster.testCase("ReadyStateHandlerTest", {
        setUp:setUp,
        tearDown:tearDown,

        "test should call success handler for status 200":function () {
            var request = forceStatusAndReadyState(this.xhr, 200, 4);

            assert(request.success);
        },

        "test should not throw error without success handler":function () {
            ajax.get("/url");

            refute.exception(function () {
                this.xhr.status = 200;
                this.xhr.readyStateChange(4);
            }.bind(this));
        },

        "test should pass null as argument to send":function () {
            ajax.get("/url");

            assert.isNull(this.xhr.send.args[0][0]);
        },

        "test should reset onreadystatechange when complete":function () {
            ajax.get("/url");

            this.xhr.status = 200;
            this.xhr.readyStateChange(4);

            assert.same(tddjs.noop, this.xhr.onreadystatechange);
        },

        "test should call success handler for local requests":function () {
            tddjs.isLocal = sinon.stub.returns(true);

            var request = forceStatusAndReadyState(this.xhr, 0, 4);

            assert(request.success);
        },

        "test should call success handler for 201 Created":function () {
            var request = forceStatusAndReadyState(this.xhr, 201, 4);

            assert(request.success);
        },

        "test should call success handler for status 206":function () {
            var request = forceStatusAndReadyState(this.xhr, 206, 4);

            assert(request.success);
        },

        "test should not call success handler for status 300":function () {
            var request = forceStatusAndReadyState(this.xhr, 300, 4);

            refute(request.success);
        },

        "test should not call success handler for status 101":function () {
            var request = forceStatusAndReadyState(this.xhr, 101, 4);

            refute(request.success);
        },

        "test should call success handler for status 304":function () {
            var request = forceStatusAndReadyState(this.xhr, 304, 4);

            assert(request.success);
        },

        "test should call failure handler for status 400":function () {
            var request = forceStatusAndReadyState(this.xhr, 400, 4);

            assert(request.failure);
        },

        "test should not call failure handler for status 200":function () {
            var request = forceStatusAndReadyState(this.xhr, 200, 4);

            refute(request.failure);
        }
    });

    buster.testCase("PostRequestTest", {
        setUp:function () {
            this.ajaxRequest = ajax.request;
        },

        tearDown:function () {
            ajax.request = this.ajaxRequest;
        },

        "test should call request with POST method":function () {
            ajax.request = sinon.stub();

            ajax.post("/url");

            assert.equals("POST", ajax.request.args[0][1].method);
        }
    });
}());
