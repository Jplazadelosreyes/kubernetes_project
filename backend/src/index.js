// backend/src/index.js
const express = require('express');
const { Pool } = require('pg'); // Importa el cliente de PostgreSQL
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir peticiones desde el frontend
const cors = require('cors');
app.use(cors()); // Habilita CORS para todas las rutas

// Middleware para parsear cuerpos JSON en las peticiones
app.use(express.json());

// Configuración de la conexión a la base de datos usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
    res.send('¡Hola desde el Backend Node.js!');
});

// Ruta de API para un saludo
app.get('/api/saludo', (req, res) => {
    res.json({ message: '¡Saludos desde la API del Backend!' });
});

// Endpoint para obtener todos los usuarios de la base de datos
app.get('/api/users', async (req, res) => {
    try {
        // Realiza una consulta a la tabla 'users'
        const result = await pool.query('SELECT id, email, nombre, apellido, rut FROM users ORDER BY id ASC');
        // Envía los resultados como JSON
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar usuarios:', err);
        res.status(500).json({ error: 'Error interno del servidor al obtener usuarios.' });
    }
});

// Endpoint para agregar un nuevo usuario a la base de datos
app.post('/api/users', async (req, res) => {
    const { email, password, nombre, apellido, rut } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    try {
        // En un entorno real, aquí deberías hashear la contraseña antes de guardarla
        // Por simplicidad, la guardamos directamente como ejemplo.
        const result = await pool.query(
            'INSERT INTO users (email, password, nombre, apellido, rut) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, nombre, apellido, rut',
            [email, password, nombre, apellido, rut]
        );
        res.status(201).json(result.rows[0]); // Devuelve el usuario recién creado
    } catch (err) {
        console.error('Error al agregar usuario:', err);
        // Manejo específico para error de email duplicado (código 23505 para unique_violation)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'El email ya está registrado.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al agregar usuario.' });
    }
});

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
    console.log(`Backend Node.js escuchando en el puerto ${port}`);
});
