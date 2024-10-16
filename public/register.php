<?php
// Conexión a la base de datos MySQL
$host = 'localhost';
$dbname = 'edugamixdb';
$user = 'root'; // 
$password = '1730'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}

// Verificar si se enviaron los datos por método POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_BCRYPT); // Hashear la contraseña

    // Verificar si el correo ya está registrado
    $sql = "SELECT email FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        echo "El correo ya está registrado.";
    } else {
        // Insertar el nuevo usuario en la base de datos
        $sql = "INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        if ($stmt->execute([$nombre, $email, $contrasena])) {
            echo "Usuario registrado exitosamente.";
        } else {
            echo "Error al registrar el usuario.";


        }
    }
}
?>
