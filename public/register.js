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

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    // Verificar si el correo ya está registrado
    connection.query('SELECT email FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error en la consulta' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        try {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            
            // Insertar el nuevo usuario en la base de datos
            connection.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', 
                [nombre, email, hashedPassword], 
                (err, result) => {
                    if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
                    res.status(201).json({ message: 'Usuario registrado exitosamente' });
                }
            );
        } catch (error) {
            res.status(500).json({ message: 'Error al procesar la contraseña' });
        }
    });
});
module.exports = router;
