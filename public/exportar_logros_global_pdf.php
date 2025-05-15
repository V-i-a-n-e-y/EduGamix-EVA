<?php
session_start();
// Control de acceso (opcional)
if (empty($_SESSION['useremail']) /* || $_SESSION['role']!=='admin' */) {
  http_response_code(403);
  exit('No autorizado');
}

require_once __DIR__ . '/db.php';            // Conexión a MySQL
require_once __DIR__ . '/tcpdf/tcpdf.php';   // Librería TCPDF

// 1) Obtener todos los usuarios
$sql    = "SELECT username, logros FROM usuarios";
$result = $conn->query($sql);

// 2) Crear PDF
$pdf = new TCPDF();
// Metadatos
$pdf->SetCreator('EduGamix');
$pdf->SetAuthor('Sistema EduGamix');
$pdf->SetTitle('Resumen Global de Logros');
$pdf->SetSubject('Reporte de logros de todos los usuarios');
// Márgenes y auto-salto
$pdf->SetMargins(20, 20, 20);
$pdf->SetAutoPageBreak(true, 20);

$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html = "<h1 style='text-align:center;'>Resumen Global de Logros</h1>";

while ($row = $result->fetch_assoc()) {
    $username = htmlspecialchars($row['username']);
    $logros   = json_decode($row['logros'] ?? '{}', true);
    if (json_last_error() !== JSON_ERROR_NONE) {
      $logros = [];
    }

    $html .= "<h3>$username</h3>";
    if (!empty($logros)) {
        foreach ($logros as $nivel => $lista) {
            $html .= "<strong>" . htmlspecialchars($nivel) . "</strong><ul>";
            foreach ($lista as $logro) {
                $html .= "<li>" . htmlspecialchars($logro) . "</li>";
            }
            $html .= "</ul>";
        }
    } else {
        $html .= "<p>Sin logros registrados.</p>";
    }
}

$pdf->writeHTML($html);

// Encabezados para mostrar inline en el navegador
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="logros_global.pdf"');

$pdf->Output('logros_global.pdf', 'I');
