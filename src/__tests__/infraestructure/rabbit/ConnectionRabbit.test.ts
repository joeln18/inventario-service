// ConnectionRabbit.test.ts

import { connect } from 'amqplib';
import ConnectionRabbit from '../../../infraestructure/rabbitmq/ConnectionRabbit';

jest.mock('amqplib', () => ({
  connect: jest.fn(),
}));

describe('ConnectionRabbit', () => {
  const mockConnect = connect as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect successfully on the first try', async () => {
    const mockConnection = { connection: 'mock' };
    mockConnect.mockResolvedValueOnce(mockConnection);

    const connection = await ConnectionRabbit();

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(connection).toBe(mockConnection);
  });

  it('should retry connection after failure', async () => {
    const mockConnection = { connection: 'mock' };

    // First attempt fails, second succeeds
    mockConnect
      .mockRejectedValueOnce(new Error('Connection failed'))
      .mockResolvedValueOnce(mockConnection);

    // Mock setTimeout to avoid real waiting
    jest.useFakeTimers();

    const promise = ConnectionRabbit();

    // Fast-forward the timer to simulate 5 seconds delay
    await Promise.resolve(); // Allow the catch block to execute
    jest.advanceTimersByTime(5000);

    // Wait for the function to complete after retry
    const connection = await promise;

    expect(mockConnect).toHaveBeenCalledTimes(2);
    expect(connection).toBe(mockConnection);

    jest.useRealTimers();
  });
});