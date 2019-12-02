'use strict';
var EventEmitter = require('events').EventEmitter;
var util = require('./util');
var initSocket = require('./init_socket');
var connectSocket = require('./connect_socket');
var Client = /** @class */ (function () {
    function Client(port, host, protocol, version, options) {
        var _this = this;
        if (protocol === void 0) { protocol = 'tcp'; }
        if (options === void 0) { options = void 0; }
        this.id = 0;
        this.port = port;
        this.host = host;
        this.version = version;
        this.callback_message_queue = {};
        this.subscribe = new EventEmitter();
        this.conn = initSocket(this, protocol, options);
        this.mp = new util.MessageParser(function (body, n) {
            _this.onMessage(body, n);
        });
        this.status = 0;
    }
    Client.prototype.connect = function () {
        if (this.status) {
            return Promise.resolve();
        }
        this.status = 1;
        return connectSocket(this.conn, this.port, this.host);
    };
    Client.prototype.close = function () {
        if (!this.status) {
            return;
        }
        this.conn.end();
        this.conn.destroy();
        this.status = 0;
    };
    Client.prototype.request = function (method, params) {
        var _this = this;
        if (!this.status) {
            return Promise.reject(new Error('ESOCKET'));
        }
        return new Promise(function (resolve, reject) {
            var id = ++_this.id;
            var content = util.makeRequest(method, params, id);
            _this.callback_message_queue[id] = util.createPromiseResult(resolve, reject);
            _this.conn.write(content + '\n');
        });
    };
    Client.prototype.response = function (msg) {
        var callback = this.callback_message_queue[msg.id];
        if (callback) {
            delete this.callback_message_queue[msg.id];
            if (msg.error) {
                callback(msg.error);
            }
            else {
                callback(null, msg.result);
            }
        }
        else {
            ; // can't get callback
        }
    };
    Client.prototype.onMessage = function (body, n) {
        var msg = JSON.parse(body);
        if (msg instanceof Array) {
            ; // don't support batch request
        }
        else {
            if (msg.id !== void 0) {
                this.response(msg);
            }
            else {
                this.subscribe.emit(msg.method, msg.params);
            }
        }
    };
    Client.prototype.onConnect = function () {
    };
    Client.prototype.onClose = function () {
        var _this = this;
        Object.keys(this.callback_message_queue).forEach(function (key) {
            _this.callback_message_queue[key](new Error('close connect'));
            delete _this.callback_message_queue[key];
        });
    };
    Client.prototype.onRecv = function (chunk) {
        this.mp.run(chunk);
    };
    Client.prototype.onEnd = function () {
    };
    Client.prototype.onError = function (e) {
    };
    return Client;
}());
module.exports = Client;
