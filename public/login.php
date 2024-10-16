<?php
// Conexión a la base de datos MySQL
$host = 'localhost';
$dbname = 'edugamixdb';
$user = 'root'; 
$password = '1730'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}

// Verificar si se enviaron los datos por método POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    // Buscar al usuario en la base de datos por su email
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if ($usuario) {
        // Verificar si la contraseña ingresada coincide con la hasheada
        if (password_verify($contrasena, $usuario['contrasena'])) {
            echo "Inicio de sesión exitoso. Bienvenido, " . $usuario['nombre'];
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Correo no registrado.";
    }
}
?>
