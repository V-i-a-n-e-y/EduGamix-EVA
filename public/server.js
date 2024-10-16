const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Puerto donde escuchará el servidor
const PORT = 3000;

// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  // Verificar si el usuario ya existe
  const userCheckQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(userCheckQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el usuario en la base de datos
    const insertQuery = 'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)';
    db.query(insertQuery, [nombre, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      return res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
  });
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  const userCheckQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(userCheckQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = result[0];

    // Verificar la contraseña
    bcrypt.compare(contrasena, user.contrasena, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }

      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  });
});

// Iniciar el servidor
app.listen(P3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
