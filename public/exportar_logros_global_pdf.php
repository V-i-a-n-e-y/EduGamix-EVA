<?php
require_once 'conexion.php';
require_once 'tcpdf/tcpdf.php';

$sql = "SELECT username, logros FROM usuarios";
$result = $conn->query($sql);

$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html = "<h1 style='text-align:center;'>Resumen Global de Logros</h1>";

while ($row = $result->fetch_assoc()) {
    $username = htmlspecialchars($row['username']);
    $logros = json_decode($row['logros'] ?? '{}', true);

    if (!empty($logros)) {
        $html .= "<h3>$username</h3>";
        foreach ($logros as $nivel => $lista) {
            $html .= "<strong>$nivel</strong><ul>";
            foreach ($lista as $logro) {
                $html .= "<li>" . htmlspecialchars($logro) . "</li>";
            }
            $html .= "</ul>";
        }
    } else {
        $html .= "<h3>$username</h3><p>Sin logros registrados.</p>";
    }
}

$pdf->writeHTML($html);
$pdf->Output("logros_global.pdf", "I");
?>
