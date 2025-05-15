<?php
$host = 'localhost'; 
$dbname = 'edugamixdb';
$user = 'root'; // Usuario de MySQL
$password = '1730'; // Contraseña de MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}


?>
