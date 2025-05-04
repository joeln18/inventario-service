import {ConsumeMessage} from 'amqplib';
import ConsumePort from '../../application/ports/input/ConsumePort';

import ConnectionRabbit from './ConnectionRabbit';
class ConsumeAdapter extends ConsumePort {
    consume(queueName: string, callback: Function): any {
        (async () => {
            try {
                const connection = await ConnectionRabbit();
                const channel = await connection?.createChannel();
                await channel?.assertQueue(queueName, { durable: true });
                console.log(`[RabbitMQ] Escuchando la cola ${queueName}`);
                channel?.consume(queueName, (msg: ConsumeMessage | null) => {
                    console.log('message queueName ', queueName, ' ', msg)
                    if(msg?.content){
                        try {
                            const data = JSON.parse(msg.content.toString());
                            callback(data);
                            channel.ack(msg);
                        } catch (error) {
                            console.log('error ConsumeAdapter', error)
                        }
                    }
                });
            } catch (error) {
                console.log('error in consumeAdapter ', error);
            }
        })();
    }
}

export default ConsumeAdapter;
