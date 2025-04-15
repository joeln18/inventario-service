# Imagen base de Node.js
FROM node:22-alpine

# Crea y entra al directorio de trabajo
WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto donde corre el servidor
EXPOSE 3000

# Comando de inicio
CMD ["npx", "ts-node", "src/server.ts"]