<?php
session_start();
require_once 'conexion.php';

if (!isset($_SESSION['useremail']) || !isset($_POST['nivel']) || !isset($_POST['puntaje']) || !isset($_POST['tiempo'])) {
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
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($puntajesJson, $tiemposJson);
$stmt->fetch();
$stmt->close();

$puntajes = json_decode($puntajesJson ?: '{}', true);
$tiempos = json_decode($tiemposJson ?: '{}', true);

$puntajes[$nivel] = $puntaje;
$tiempos[$nivel] = $tiempo;

$update = $conn->prepare("UPDATE usuarios SET puntajes=?, tiempos=? WHERE email=?");
$update->bind_param("sss", json_encode($puntajes), json_encode($tiempos), $email);
$update->execute();
$update->close();
$conn->close();

echo "Estadísticas guardadas";
?>
