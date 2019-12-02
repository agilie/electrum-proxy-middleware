'use strict';
var net = require('net');
var TIMEOUT = 10000;
var getSocket = function (protocol, options) {
    switch (protocol) {
        case 'tcp':
            return new net.Socket();
        case 'tls':
        case 'ssl':
            var tls = void 0;
            try {
                tls = require('tls');
            }
            catch (e) {
                throw new Error('tls package could not be loaded');
            }
            return new tls.TLSSocket(options);
    }
    throw new Error('unknown protocol');
};
var initSocket = function (self, protocol, options) {
    var conn = getSocket(protocol, options);
    conn.setTimeout(TIMEOUT);
    conn.setEncoding('utf8');
    conn.setKeepAlive(true, 0);
    conn.setNoDelay(true);
    conn.on('connect', function () {
        conn.setTimeout(0);
        self.onConnect();
    });
    conn.on('close', function (e) {
        self.onClose(e);
    });
    conn.on('timeout', function () {
        var e = new Error('ETIMEDOUT');
        e.errorno = 'ETIMEDOUT';
        e.code = 'ETIMEDOUT';
        e.connect = false;
        conn.emit('error', e);
    });
    conn.on('data', function (chunk) {
        conn.setTimeout(0);
        self.onRecv(chunk);
    });
    conn.on('end', function (e) {
        conn.setTimeout(0);
        self.onEnd(e);
    });
    conn.on('error', function (e) {
        self.onError(e);
    });
    return conn;
};
module.exports = initSocket;
