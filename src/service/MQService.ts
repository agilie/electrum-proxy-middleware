const amqp =  require('amqplib/callback_api');

const connectionConfig = {
    protocol: 'amqp',
    hostname: '',
    port: 5672,
    username: 'dev',
    password: '',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
};

let ch : any = null;
amqp.connect(connectionConfig, function (err: any, conn: any) {
    conn.createChannel(function (err: any, channel: any) {
        ch = channel;
    });
});

module.exports.checkQueue = async (queueName: string) => {
    if(ch === null || process.env.NODE_ENV === 'test') {return;}
    ch.assertQueue(queueName, {
        durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

    ch.consume("Peers", processMsg, {noAck: false});
    console.log("Worker is started");
};

function processMsg(msg: string) {
    work(msg, function (ok: any) {
        try {
            if (ok)
                ch.ack(msg);
            else
                ch.reject(msg, true);
        } catch (e) {
            closeOnErr(e);
        }
    });
}

function work(msg: any, cb: any) {
    var fs = require('fs');

    fs.writeFile('electrum_servers.json', msg.content.toString(), function (err: any) {
        if (err) throw err;
        console.log('Saved!');
    });
    console.log("Electrum servers ", msg.content.toString());
    cb(true);
}

function closeOnErr(err: any) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    ch.close();
    return true;
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

