'use strict';
var makeRequest = exports.makeRequest = function (method, params, id) {
    return JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: id,
    });
};
var createRecuesiveParser = exports.createRecuesiveParser = function (max_depth, delimiter) {
    var MAX_DEPTH = max_depth;
    var DELIMITER = delimiter;
    var recursiveParser = function (n, buffer, callback) {
        if (buffer.length === 0) {
            return { code: 0, buffer: buffer };
        }
        if (n > MAX_DEPTH) {
            return { code: 1, buffer: buffer };
        }
        var xs = buffer.split(DELIMITER);
        if (xs.length === 1) {
            return { code: 0, buffer: buffer };
        }
        callback(xs.shift(), n);
        return recursiveParser(n + 1, xs.join(DELIMITER), callback);
    };
    return recursiveParser;
};
var createPromiseResult = exports.createPromiseResult = function (resolve, reject) {
    return function (err, result) {
        if (err)
            reject(err);
        else
            resolve(result);
    };
};
var MessageParser = /** @class */ (function () {
    function MessageParser(callback) {
        this.buffer = '';
        this.callback = callback;
        this.recursiveParser = createRecuesiveParser(20, '\n');
    }
    MessageParser.prototype.run = function (chunk) {
        this.buffer += chunk;
        while (true) {
            var res = this.recursiveParser(0, this.buffer, this.callback);
            this.buffer = res.buffer;
            if (res.code === 0) {
                break;
            }
        }
    };
    return MessageParser;
}());
exports.MessageParser = MessageParser;
