module.exports = function () {

    console.log("ok")
    let amqp = require('amqplib/callback_api');


    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) throw error0;

        connection.createChannel(function (error1, channel) {
            if (error1) throw error1;

            let queue = 'tut.rpc.requests';

            // channel.assertQueue(queue, {durable: false});
            channel.prefetch(1);
            console.log(' [x] Awaiting RPC requests');
            channel.consume(queue, function reply(msg) {

                console.log(JSON.parse(msg.content.toString()))

                let r = '12'

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(r.toString()), {correlationId: msg.properties.correlationId});

                channel.ack(msg);
            });
        });
    });
};
