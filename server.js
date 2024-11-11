const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes usar cualquier servicio de correo
  auth: {
    user: 'tucorreo@gmail.com', // Tu correo
    pass: 'tucontraseña' // Tu contraseña
  }
});

// Middleware de seguridad
app.use(helmet());
app.use(cors());

// Limita el número de solicitudes a la API desde la misma IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo después de 15 minutos'
});
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Aquí guardarías el usuario en la base de datos
    // db.saveUser({ username, email, password: hashedPassword });

    // Enviar correo de verificación
    const mailOptions = {
      from: 'tucorreo@gmail.com',
      to: email,
      subject: `Correo de Validación del ${username} de EduGamix`,
      html: `<p>Hola ${username},</p>
             <p>Gracias por registrarte en EduGamix. Por favor, haz clic en el siguiente enlace para verificar tu cuenta:</p>
             <a href="http://localhost:3000/iniciodesesion.html">Verificar Cuenta</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo de verificación' });
      } else {
        console.log('Correo enviado:', info.response);
        res.status(201).json({ message: 'Usuario registrado exitosamente. Por favor, verifica tu correo.' });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
