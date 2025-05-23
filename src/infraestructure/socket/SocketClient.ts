// src/sockets/SocketClient.ts
import { io, Socket } from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

export class SocketClient {
  private socket: Socket;

  constructor() {
    this.socket = io(process.env.URL_SOCKET ?? 'http://localhost:3001', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log(`✅ Conectado al servidor de sockets (${this.socket.id})`);
    });

    this.socket.on('disconnect', () => {
      console.log(`❌ Desconectado del servidor de sockets`);
    });
  }

  // Emitir un evento
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Escuchar un evento
  public on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Cerrar la conexión
  public disconnect(): void {
    this.socket.disconnect();
  }
}