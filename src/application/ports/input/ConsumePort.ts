export default class ConsumePort {
    consume(queueName: string, callback: Function): Promise<any> {
        console.log('[queueName] ', queueName);
        throw new Error('Not implemented');
    }
}