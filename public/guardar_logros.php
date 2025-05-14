<?php
session_start();
require_once 'conexion.php';

if (!isset($_SESSION['useremail']) || !isset($_POST['nivel']) || !isset($_POST['logros'])) {
    http_response_code(400);
    echo "Faltan datos";
    exit;
}

$email = $_SESSION['useremail'];
$nivel = htmlspecialchars($_POST['nivel']);
$logrosRecibidos = json_decode($_POST['logros'], true);

if (!is_array($logrosRecibidos)) {
    http_response_code(400);
    echo "Logros inválidos";
    exit;
}

$sql = "SELECT logros FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($logrosJson);
$stmt->fetch();
$stmt->close();

$logros = json_decode($logrosJson ?: '{}', true);
$logros[$nivel] = $logrosRecibidos;

$update = $conn->prepare("UPDATE usuarios SET logros = ? WHERE email = ?");
$json = json_encode($logros);
$update->bind_param("ss", $json, $email);
$update->execute();
$update->close();

echo "Logros guardados";
?>
