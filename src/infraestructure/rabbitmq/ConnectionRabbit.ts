import {connect} from 'amqplib';


const rabbitmqHost = process.env.RABBITMQ_HOST ?? 'rabbitmq';

async function ConnectionRabbit() {
  let connection;
  while (!connection) {
    try {
      connection = await connect(`amqp://${rabbitmqHost}`);
      console.log("[RabbitMQ] Conexión exitosa a", rabbitmqHost);
      return connection;
    } catch (error) {
      console.error("[RabbitMQ] Error de conexión, reintentando en 5 segundos...+", error);
      await new Promise(res => setTimeout(res, 5000)); // Espera 5 segundos y reintenta
    }
  }
}

export default ConnectionRabbit;