<?php
session_start();
if (empty($_SESSION['useremail'])) {
  http_response_code(401);
  exit('No autorizado');
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/tcpdf/tcpdf.php';

$email = $_SESSION['useremail'];

// Recuperar datos de usuario
$sql  = "SELECT username, logros FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($username, $logrosJson);
if (!$stmt->fetch()) {
  http_response_code(404);
  exit('Usuario no encontrado');
}
$stmt->close();

// Decodificar JSON de logros
$logros = json_decode($logrosJson ?: '{}', true);
if (json_last_error() !== JSON_ERROR_NONE) {
  $logros = [];
}

// Generar PDF
$pdf = new TCPDF();
// Metadatos
$pdf->SetCreator('EduGamix');
$pdf->SetAuthor($username);
$pdf->SetTitle("Logros de $username");
$pdf->SetSubject('Reporte de logros');
// Márgenes y auto-salto
$pdf->SetMargins(20, 20, 20);
$pdf->SetAutoPageBreak(true, 20);

$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html  = "<h1 style='text-align:center;'>Logros de " . htmlspecialchars($username) . "</h1>";
if (empty($logros)) {
  $html .= "<p>No se han registrado logros aún.</p>";
} else {
  foreach ($logros as $nivel => $items) {
    $html .= "<h3>" . htmlspecialchars($nivel) . "</h3><ul>";
    foreach ($items as $logro) {
      $html .= "<li>" . htmlspecialchars($logro) . "</li>";
    }
    $html .= "</ul>";
  }
}

$pdf->writeHTML($html);

// Forzar headers y salida inline
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="logros_' . preg_replace('/\W+/', '_', $username) . '.pdf"');
$pdf->Output("logros_" . preg_replace('/\W+/', '_', $username) . ".pdf", "I");
