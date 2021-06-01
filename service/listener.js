const keys = require('../keys/index');
let amqp = require('amqplib/callback_api');
let request_handler = require('../util/request.handler');

function listenerServer(queue) {
    amqp.connect(keys.RABBIT_HOST, function (connectionError, connection) {
        if (connectionError) throw connectionError;

        connection.createChannel(function (channelError, channel) {
            if (channelError) throw channelError;

            channel.prefetch(1);
            console.log('>>> awaiting RPC requests...');
            channel.consume(queue, function reply(msg) {

                let request = JSON.parse(msg.content.toString());
                console.log(request) // output the request

                request_handler(request)
                    .then(value => {
                        console.log('>>> value = ' + value)
                        channel.sendToQueue(msg.properties.replyTo,
                            Buffer.from(JSON.stringify(value)), {correlationId: msg.properties.correlationId});
                    })
                    .catch(reason => {
                        console.error(reason);
                        channel.sendToQueue(msg.properties.replyTo,
                            Buffer.from(JSON.stringify('')),
                            {correlationId: msg.properties.correlationId});
                    });

                channel.ack(msg);
            });
        });
    });
}

module.exports = function () {
    listenerServer(keys.EMAIL_QUEUE);
    listenerServer(keys.TOKEN_QUEUE);
};
