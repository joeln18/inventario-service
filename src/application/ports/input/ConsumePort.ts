export default interface  IConsumePort {
    consume(queueName: string, callback: Function): Promise<any>;
}