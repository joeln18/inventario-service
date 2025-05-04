export default interface  IPublisherPort {
    publish(queueName: string, message: any): Promise<any>;
}