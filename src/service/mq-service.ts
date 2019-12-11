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
let response : string = '';
amqp.connect(connectionConfig, function (err: any, conn: any) {
    if(ch === null || process.env.NODE_ENV === 'test') {return;}
    conn.createChannel(function (err: any, channel: any) {
        ch = channel;
    });
});

export async function checkQueue(queueName: string) {
    if(ch === null || process.env.NODE_ENV === 'test') {return;}
    ch.assertQueue(queueName, {
        durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

    ch.consume("Peers", processMsg, {noAck: false});
    return response;
}

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
    response = msg.content.toString();
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

