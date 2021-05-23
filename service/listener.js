const keys = require('../keys/index');

module.exports = function () {
    let amqp = require('amqplib/callback_api');

    amqp.connect(keys.RABBIT_HOST, function (connectionError, connection) {
        if (connectionError) throw connectionError;


        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError;
            }
            let queue = keys.QUEUE;

            // channel.assertQueue(queue, {durable: false});
            channel.prefetch(1);
            console.log('>>> awaiting RPC requests...');
            channel.consume(queue, function reply(msg) {
                console.log(JSON.parse(msg.content.toString())) // output the request
                // request = { type=(email|token), value=value }
                // type == email ? createTokenSendEmail : validateToken

                let response = 12 // test response
                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(response.toString()), {correlationId: msg.properties.correlationId});

                channel.ack(msg);
            });
        });
    });
};
