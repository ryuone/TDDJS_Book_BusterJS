if (!Array.isArray) {
    Array.isArray = (function () {
        function isArray(object) {
            return Object.prototype.toString.call(object) ==
                "[object Array]";
        }

        return isArray;
    }());
}
