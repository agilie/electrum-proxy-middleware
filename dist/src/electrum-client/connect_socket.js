'use strict';
var connectSocket = function (conn, port, host) {
    return new Promise(function (resolve, reject) {
        var errorHandler = function (e) { return reject(e); };
        conn.connect(port, host, function () {
            conn.removeListener('error', errorHandler);
            resolve();
        });
        conn.on('error', errorHandler);
    });
};
module.exports = connectSocket;
