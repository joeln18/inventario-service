
import ConnectionRabbit from '../../../infraestructure/rabbitmq/ConnectionRabbit';
import ConsumeAdapter from '../../../infraestructure/rabbitmq/ConsumeAdapter';

import { ConsumeMessage } from 'amqplib';

jest.mock('../../../infraestructure/rabbitmq/ConnectionRabbit.ts', () => {
    return jest.fn().mockReturnValue({
        createChannel: jest.fn(),
    });
});

describe('ConsumeAdapter', () => {
    let mockChannel: any;

    beforeEach(() => {
        mockChannel = {
            assertQueue: jest.fn(),
            consume: jest.fn(),
            ack: jest.fn(),
        };
        (ConnectionRabbit as jest.Mock).mockReturnValue({
            createChannel: jest.fn().mockResolvedValue(mockChannel),
        });
    });

    it('should consume a message and invoke the callback with parsed data', async () => {
        const consumeAdapter = new ConsumeAdapter();
        const callback = jest.fn();
        const queueName = 'testQueue';
        const message: ConsumeMessage = {
            content: Buffer.from(JSON.stringify({ key: 'value' })),
            fields: {} as any,
            properties: {} as any,
        };

        mockChannel.consume.mockImplementation((_: any, onMessage: any) => {
            onMessage(message);
        });

        await consumeAdapter.consume(queueName, callback);

        expect(mockChannel.ack).not.toHaveBeenCalledWith(message);
    });

    it('should handle JSON parsing errors gracefully', async () => {
        const consumeAdapter = new ConsumeAdapter();
        const callback = jest.fn();
        const queueName = 'testQueue';
        const message: ConsumeMessage = {
            content: Buffer.from('invalid JSON'),
            fields: {} as any,
            properties: {} as any,
        };

        mockChannel.consume.mockImplementation((_: any, onMessage: any) => {
            onMessage(message);
        });

        await consumeAdapter.consume(queueName, callback);

        expect(callback).not.toHaveBeenCalled();
        expect(mockChannel.ack).not.toHaveBeenCalled();
    });

    it('should handle connection or channel creation errors', async () => {
        (ConnectionRabbit as jest.Mock).mockRejectedValue(new Error('Connection error'));

        const consumeAdapter = new ConsumeAdapter();
        const callback = jest.fn();
        const queueName = 'testQueue';

        await consumeAdapter.consume(queueName, callback);

        expect(mockChannel.assertQueue).not.toHaveBeenCalled();
        expect(mockChannel.consume).not.toHaveBeenCalled();
        expect(callback).not.toHaveBeenCalled();
    });
});