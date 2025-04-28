export default class PublisherPort {
    publish(queueName: string, message: {id: number; data: object;}): Promise<any> {
        console.log('[queueName] ', queueName);
        console.log('[message]', JSON.stringify(message));
        throw new Error('Not implemented');
    }
}