# Microservicio de Inventario

Este es el microservicio de Inventario del sistema de gestión de pedidos de un restaurante. Se encarga de gestionar los ingredientes y recetas, validar la disponibilidad de ingredientes para nuevos pedidos y actualizar el inventario.

## 🚀 Requisitos Previos

Antes de ejecutar el microservicio, asegúrate de tener instalado lo siguiente:

- **Node.js** (Versión recomendada: 18+)
- **PostgreSQL** (Configurado y ejecutándose)
- **Git** (Opcional, para clonar el repositorio)

## 📂 Configuración del Proyecto

### 1️⃣ Clonar el Repositorio

```sh
 git clone <URL_DEL_REPOSITORIO>
 cd nombre-del-repositorio
```

### 2️⃣ Instalar Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```sh
 npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
 PORT=3000
 DB_USER=postgres
 DB_HOST=localhost
 DB_DATABASE=restaurante
 DB_PASSWORD=tu_contraseña
 DB_PORT=5432
```

**Nota:** Cambia `tu_contraseña` por la contraseña real de tu usuario de PostgreSQL.

### 4️⃣ Crear la Base de Datos y Tablas

Ejecuta el siguiente script SQL en PostgreSQL para crear las tablas necesarias:

```sql
 CREATE TABLE IF NOT EXISTS unidad_medida (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(50) UNIQUE NOT NULL
 );

 CREATE TABLE IF NOT EXISTS ingrediente (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(100) UNIQUE NOT NULL,
     cantidad DECIMAL(10,2) NOT NULL,
     unidad_medida_id INT NOT NULL,
     FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida(id)
 );

 CREATE TABLE IF NOT EXISTS receta (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(100) UNIQUE NOT NULL
 );

 CREATE TABLE IF NOT EXISTS ingrediente_receta (
     id SERIAL PRIMARY KEY,
     receta_id INT NOT NULL,
     ingrediente_id INT NOT NULL,
     cantidad DECIMAL(10,2) NOT NULL,
     unidad_medida_id INT NOT NULL,
     FOREIGN KEY (receta_id) REFERENCES receta(id),
     FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id),
     FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida(id)
 );
```

### 5️⃣ Ejecutar el Proyecto

Inicia el servidor ejecutando:

```sh
 npm run dev
```

El microservicio se ejecutará en `http://localhost:3000`.

## 📌 Endpoints Principales

| Método | Endpoint         | Descripción |
|--------|----------------|-------------|
| GET    | `/ingredientes` | Lista todos los ingredientes |
| GET    | `/recetas`      | Lista todas las recetas |
| POST   | `/ingredientes` | Agrega un nuevo ingrediente |
| POST   | `/recetas`      | Agrega una nueva receta |

## 🛠 Tecnologías Utilizadas

- **Node.js** con **Express**
- **PostgreSQL** como base de datos
- **TypeScript**
- **Arquitectura Hexagonal**

## 📝 Notas Adicionales

Si encuentras algún error relacionado con permisos en la base de datos, revisa los permisos de tu usuario de PostgreSQL con:

```sql
 GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
```

Si necesitas ayuda, ¡abre un issue o contáctanos! 🚀

