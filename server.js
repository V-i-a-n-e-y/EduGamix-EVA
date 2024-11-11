const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validar la entrada del usuario
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Hash de la contraseña antes de guardarla
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Aquí guardarías el usuario en la base de datos
        // db.saveUser({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
