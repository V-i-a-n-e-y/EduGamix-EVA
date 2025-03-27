<?php
session_start();

// Datos de la base de datos
$servername = "localhost"; 
//$username = "u779086120_Bvianeyhm"; 
$username = "root"; 
$password = ""; 
//$password = "W+>dWT1&1l"; 
$dbname = "u779086120_edugamix"; 

// Crear conexión 
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión 
if ($conn->connect_error) { 
    die("Conexión fallida: " . $conn->connect_error);
}

// Capturar datos del formulario
$usuario = $_POST['usuario']; 
$contrasena = $_POST['password']; 

// SQL para verificar usuario
$sql = "SELECT nombre, contrasena FROM usuarios WHERE nombre='$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Obtener datos del usuario
    $row = $result->fetch_assoc();
    if (password_verify($contrasena, $row['contrasena'])) {
        // Guardar datos en la sesión 
        $_SESSION['username'] = $row['nombre']; 
        //$_SESSION['useremail'] = $row['email']; 
        // Redirigir a la página de bienvenida 
        echo "<script> 
        sessionStorage.setItem('username', '" . $row['nombre'] . "'); 
        sessionStorage.setItem('useremail', '" . $row['email'] . "'); 
        window.location.href = 'inicio.php'; 
        </script>"; 
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "No existe una cuenta con ese usuario.";
}

// Cerrar conexión
$conn->close();
?>
