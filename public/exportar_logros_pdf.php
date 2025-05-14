<?php
session_start();
require_once 'conexion.php';
require_once 'tcpdf/tcpdf.php';

if (!isset($_SESSION['useremail'])) {
  die("No autorizado");
}

$email = $_SESSION['useremail'];
$sql = "SELECT username, logros FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($username, $logrosJson);
$stmt->fetch();
$stmt->close();

$logros = json_decode($logrosJson ?: '{}', true);

$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html = "<h1 style='text-align:center;'>Logros de $username</h1>";
if (empty($logros)) {
  $html .= "<p>No se han registrado logros aún.</p>";
} else {
  foreach ($logros as $nivel => $lista) {
    $html .= "<h3>$nivel</h3><ul>";
    foreach ($lista as $logro) {
      $html .= "<li>$logro</li>";
    }
    $html .= "</ul>";
  }
}

$pdf->writeHTML($html);
$pdf->Output("logros_$username.pdf", "I");
?>
