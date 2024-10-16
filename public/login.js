const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const router = express.Router();

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'edugamixdb',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para iniciar sesión
router.post('/login.js', (req, res) => {
    const { email, contrasena } = req.body;

    // Buscar al usuario por su email en la base de datos
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error en la consulta' });

        if (results.length === 0) {
            return res.status(400).json({ message: 'Correo no registrado' });
        }

        const usuario = results[0];

        try {
            // Verificar si la contraseña ingresada coincide con la hasheada en la base de datos
            const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            res.status(200).json({ message: `Inicio de sesión exitoso. Bienvenido, ${usuario.nombre}` });
        } catch (error) {
            res.status(500).json({ message: 'Error al verificar la contraseña' });
        }
    });
});

module.exports = router;
