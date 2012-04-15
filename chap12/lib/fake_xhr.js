var fakeXMLHttpRequest = {
    open:sinon.spy(),
    send:sinon.spy(),

    setRequestHeader:function (header, value) {
        if (!this.headers) {
            this.headers = {};
        }

        this.headers[header] = value;
    },

    readyStateChange:function (readyState) {
        this.readyState = readyState;
        this.onreadystatechange();
    }
};

if (typeof module == "object") {
    module.exports.fakeXMLHttpRequest = fakeXMLHttpRequest;
}
