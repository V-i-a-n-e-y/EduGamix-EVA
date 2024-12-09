<?php 
/* Datos de la base de datos*/ 
$servername = "localhost"; 
$username = "u779086120_Bvianeyhm"; 
$password = "W+>dWT1&1l"; 
$dbname = "u779086120_edugamix"; 
// Crear conexión 
$conn = new mysqli($servername, $username, $password, $dbname); 
// Verificar conexión 
if ($conn->connect_error) 
{ 
 die("Conexión fallida:".$conn->connect_error); 
} 
// Capturar datos del formulario 
$nombre = $_POST['nombre']; 
$email = $_POST['email']; 
$contrasena = $_POST['password']; 
// Verificar si las contraseñas coinciden 
if ($_POST['password'] !== $_POST['confirm-contrasena']) 
{ 
    die("Las contraseñas no coinciden."); 
} 
// Encriptar la contraseña 
$contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT); 
// SQL para insertar datos 
$sql = "INSERT INTO usuarios (nombre, email, contrasena) VALUES ('$nombre', '$email', '$contrasena_hash')"; 
if ($conn->query($sql) === TRUE) { 
echo "<script> alert('Nuevo jugador registrado exitosamente, ahora puedes iniciar sesión'); 
window.location.href = 'login.html'; 
</script>"; 
} 
else 
{ 
    echo "Error:".$sql."<br>".$conn->error; 
    
} 
// Cerrar conexión 
$conn->close(); 
?>