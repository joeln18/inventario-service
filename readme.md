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
 CREATE DATABASE restaurante OWNER mi_usuario;
 \c restaurante;
 CREATE TABLE IF NOT EXISTS unidad_medida (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(50) UNIQUE NOT NULL
 );

 CREATE TABLE IF NOT EXISTS ingrediente (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(100) UNIQUE NOT NULL,
     cantidad INT NOT NULL,
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
     cantidad INT NOT NULL,
     unidad_medida_id INT NOT NULL,
     FOREIGN KEY (receta_id) REFERENCES receta(id),
     FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id),
     FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida(id)
 );
```

Ejecuta el siguiente script SQL en PostgreSQL para llenar con data dummy la base de datos:

```sql
-- Insertar unidades de medida
INSERT INTO unidad_medida (nombre) VALUES
    ('Gramos'),
    ('Litros'),
    ('Unidades');

-- Insertar ingredientes
INSERT INTO ingrediente (nombre, cantidad, unidad_medida_id) VALUES
    ('Harina', 500, 1),  -- 500 gramos de harina
    ('Leche', 1, 2),     -- 1 litro de leche
    ('Huevo', 3, 3);     -- 3 unidades de huevo

-- Insertar recetas
INSERT INTO receta (nombre) VALUES
    ('Panqueques'),
    ('Bizcocho');

-- Insertar ingredientes en recetas
INSERT INTO ingrediente_receta (receta_id, ingrediente_id, cantidad, unidad_medida_id) VALUES
    (1, 1, 250, 1), -- 250g de harina para Panqueques
    (1, 2, 0.5, 2), -- 0.5 litros de leche para Panqueques
    (1, 3, 2, 3),   -- 2 huevos para Panqueques
    (2, 1, 300, 1), -- 300g de harina para Bizcocho
    (2, 2, 0.3, 2), -- 0.3 litros de leche para Bizcocho
    (2, 3, 3, 3);   -- 3 huevos para Bizcocho
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

Si necesitas ayuda, ¡Abre un issue o contáctanos! 🚀

