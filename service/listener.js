const keys = require('../keys/index');
let amqp = require('amqplib/callback_api');

function listenerServer(queue, response) {
    amqp.connect(keys.RABBIT_HOST, function (connectionError, connection) {
        if (connectionError) throw connectionError;

        connection.createChannel(function (channelError, channel) {
            if (channelError) throw channelError;

            // channel.assertQueue(queue, {durable: false});
            channel.prefetch(1);
            console.log('>>> awaiting RPC requests...');
            channel.consume(queue, function reply(msg) {
                console.log(JSON.parse(msg.content.toString())) // output the request

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(response.toString()), {correlationId: msg.properties.correlationId});

                channel.ack(msg);
            });
        });
    });
}

module.exports = function () {
    listenerServer(keys.EMAIL_QUEUE, 12);
    listenerServer(keys.TOKEN_QUEUE, 123);
};
