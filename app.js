const express = require('express');  
const bodyParser = require('body-parser'); 
const mysql = require('mysql2');  
const bcrypt = require('bcrypt');  
const path = require('path');

const app = express();  
const PORT = 3000;  

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar JSON y datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());  

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'edugamixdb',
    port: 3306   
});

// Conectar a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return; // Salimos si hay un error
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Sirve el archivo index.html en la raíz
});

// Ruta de registro (POST)
app.post('/register', async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    // Verificamos si el email ya existe en la base de datos
    connection.query('SELECT email FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la consulta' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        
        // Hasheamos la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertamos el nuevo usuario en la base de datos
        connection.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', 
            [nombre, email, hashedPassword], 
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            }
        );
    });
});

// Ruta de inicio de sesión (POST)
app.post('/login', async (req, res) => {
    const { email, contrasena } = req.body;

    // Verificacion de usuario existe en la base de datos
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la consulta' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Correo no registrado' });
        }

        const usuario = results[0];

        // Verificacion de la contraseña correcta comparando con la hasheada
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Guardamos el nombre y el correo del usuario en localStorage usando JavaScript en el navegador
        res.send(`
            <script>
                localStorage.setItem('username', '${usuario.nombre}');
                localStorage.setItem('useremail', '${usuario.email}');
                window.location.href = '/inicio';
            </script>
        `);
    });
});

// Ruta para servir inicio.html después de iniciar sesión exitosamente
app.get('/inicio', (req, res) => {
    console.log('Sirviendo inicio.html');
    res.sendFile(path.join(__dirname, 'public', 'inicio.html')); // Sirve el archivo inicio.html
});
 
// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
