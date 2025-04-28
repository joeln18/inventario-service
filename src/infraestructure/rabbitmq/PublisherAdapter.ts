import PublisherPort from '../../application/ports/output/PublisherPort';
import ConnectionRabbit from './ConnectionRabbit';

class PublisherAdapter extends PublisherPort {
    publish(queueName: string, message: {id: number; data: object}): any {
        (async () => {
            try {
                const connection = await ConnectionRabbit();
                const channel = await connection?.createChannel();
                await channel?.assertQueue(queueName, { durable: true });
                channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
                await channel?.close();
                await connection?.close();
            } catch (error) {
                console.log('Error en PublisherAdapter ', error);
            }
        })();
    }
}

export default PublisherAdapter;
