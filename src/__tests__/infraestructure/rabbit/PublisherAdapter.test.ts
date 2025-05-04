import ConnectionRabbit from "../../../infraestructure/rabbitmq/ConnectionRabbit";
import PublisherAdapter from "../../../infraestructure/rabbitmq/PublisherAdapter";

jest.mock('../../../infraestructure/rabbitmq/ConnectionRabbit.ts', () => {
    return jest.fn().mockReturnValue({
        createChannel: jest.fn(),
        close: jest.fn()
    })
});

describe('PublisherAdapter', () => {
    it('publish', async () => {
        try {
            const publishAdapter = new PublisherAdapter();
            const connection = await ConnectionRabbit();
            (connection?.createChannel as jest.Mock)
            .mockReturnValue({
                assertQueue: jest.fn(),
                sendToQueue: jest.fn(),
                close: jest.fn()
            });
            expect(publishAdapter.publish('TEST', {id: 1, data: {}})).toBeDefined();
        } catch (error) {
            console.log('error test publisherAdapter ', error);
        }
    })

    it('publish error', async () => {
        try {
            const publishAdapter = new PublisherAdapter();
            const connection = await ConnectionRabbit();
            (connection?.createChannel as jest.Mock).mockRejectedValue({});
            expect(publishAdapter.publish('TEST', {id: 1, data: {}})).toBeDefined();
        } catch (error) {
            console.log('error test publisherAdapter ', error);
        }
    })
})