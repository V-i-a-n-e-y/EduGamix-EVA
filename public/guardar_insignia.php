<?php
session_start();
require_once 'conexion.php';

if (!isset($_SESSION['useremail'], $_POST['nivel'], $_POST['puntaje'], $_POST['tiempo'])) {
    http_response_code(400);
    echo "Faltan datos";
    exit;
}

$email = $_SESSION['useremail'];
$nivel = htmlspecialchars($_POST['nivel']);
$puntaje = intval($_POST['puntaje']);
$tiempo = htmlspecialchars($_POST['tiempo']);

$sql = "SELECT puntajes, tiempos FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo "Error al preparar la consulta: " . $conn->error;
    exit;
}
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($puntajesJson, $tiemposJson);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo "Usuario no encontrado";
    exit;
}
$stmt->close();

$puntajes = json_decode($puntajesJson ?: '{}', true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo "Error al decodificar puntajes JSON";
    exit;
}
$tiempos = json_decode($tiemposJson ?: '{}', true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo "Error al decodificar tiempos JSON";
    exit;
}

$puntajes[$nivel] = $puntaje;
$tiempos[$nivel] = $tiempo;

try {
    $puntajesJson = json_encode($puntajes, JSON_THROW_ON_ERROR);
    $tiemposJson = json_encode($tiempos, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    http_response_code(500);
    echo "Error al codificar JSON: " . $e->getMessage();
    exit;
}

$update = $conn->prepare("UPDATE usuarios SET puntajes=?, tiempos=? WHERE email=?");
if (!$update) {
    http_response_code(500);
    echo "Error al preparar la actualización: " . $conn->error;
    exit;
}
$update->bind_param("sss", $puntajesJson, $tiemposJson, $email);
if (!$update->execute()) {
    http_response_code(500);
    echo "Error al actualizar los datos: " . $update->error;
    exit;
}
$update->close();
$conn->close();

echo "Estadísticas guardadas";
?>
