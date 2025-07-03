-- mi-proyecto/database/init.sql

-- Crea la tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- En un entorno real, aquí iría un hash de la contraseña
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    rut VARCHAR(20) UNIQUE -- RUT chileno o similar, ajusta el tipo si es necesario
    );

-- Inserta 10 usuarios de ejemplo
INSERT INTO users (email, password, nombre, apellido, rut) VALUES
                                                               ('usuario1@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Juan', 'Perez', '11111111-1'),
                                                               ('usuario2@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Maria', 'Gonzalez', '22222222-2'),
                                                               ('usuario3@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Pedro', 'Ramirez', '33333333-3'),
                                                               ('usuario4@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Ana', 'Diaz', '44444444-4'),
                                                               ('usuario5@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Luis', 'Soto', '55555555-5'),
                                                               ('usuario6@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Carla', 'Morales', '66666666-6'),
                                                               ('usuario7@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Diego', 'Castro', '77777777-7'),
                                                               ('usuario8@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Sofia', 'Rojas', '88888888-8'),
                                                               ('usuario9@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Pablo', 'Vargas', '99999999-9'),
                                                               ('usuario10@example.com', '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno', 'Laura', 'Herrera', '10101010-0');

-- Nota: El password '$2a$10$abcdefghijklmnopqrstuvwx.abcdefghijklmno' es un hash de ejemplo.
-- En una aplicación real, usarías una librería de hashing (ej. bcrypt) para generar contraseñas seguras.