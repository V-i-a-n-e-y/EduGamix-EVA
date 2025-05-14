<?php
require_once 'conexion.php';
require_once 'tcpdf/tcpdf.php';

$insigniaId = $_GET['insignia'] ?? '';
$escuela = $_GET['escuela'] ?? '';
$clase = $_GET['clase'] ?? '';
$grupo = $_GET['grupo'] ?? '';

$sql = "SELECT username, insignias, puntajes, tiempos, escuela, clase, grupo FROM usuarios WHERE 1=1";
$params = [];
$types = '';

if ($escuela) { $sql .= " AND escuela = ?"; $params[] = $escuela; $types .= 's'; }
if ($clase) { $sql .= " AND clase = ?"; $params[] = $clase; $types .= 's'; }
if ($grupo) { $sql .= " AND grupo = ?"; $params[] = $grupo; $types .= 's'; }

$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$ranking = [];
while ($row = $result->fetch_assoc()) {
    $insignias = json_decode($row['insignias'], true);
    $puntajes = json_decode($row['puntajes'] ?? '{}', true);
    $tiempos = json_decode($row['tiempos'] ?? '{}', true);
    foreach ($insignias as $nivel => $id) {
        if ($id === $insigniaId) {
            $ranking[] = [
                "usuario" => $row['username'],
                "puntaje" => $puntajes[$nivel] ?? 0,
                "tiempo" => $tiempos[$nivel] ?? "N/A"
            ];
            break;
        }
    }
}
usort($ranking, fn($a, $b) => $b['puntaje'] <=> $a['puntaje']);

$totalUsuarios = count($ranking);
$sumaPuntajes = array_sum(array_column($ranking, 'puntaje'));
$promedioPuntaje = $totalUsuarios ? round($sumaPuntajes / $totalUsuarios, 2) : 0;

function tiempoASegundos($t) {
  if ($t === "N/A") return 0;
  list($m, $s) = explode(":", $t);
  return $m * 60 + $s;
}
$tiempos = array_map(fn($r) => tiempoASegundos($r['tiempo']), $ranking);
$promTiempoSeg = array_sum($tiempos) / max(1, $totalUsuarios);
$minProm = floor($promTiempoSeg / 60);
$secProm = round($promTiempoSeg % 60);
$promedioTiempo = sprintf("%02d:%02d", $minProm, $secProm);

$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html = "<h1 style='text-align:center;'>Ranking de la Insignia: $insigniaId</h1>";
if ($escuela || $clase || $grupo) {
  $html .= "<p><strong>Filtros:</strong><br>";
  if ($escuela) $html .= "📚 Escuela: $escuela<br>";
  if ($clase) $html .= "🏫 Clase: $clase<br>";
  if ($grupo) $html .= "👥 Grupo: $grupo<br>";
  $html .= "</p>";
}
$html .= "<p><strong>Resumen:</strong><br>👥 Total: $totalUsuarios<br>🏆 Puntaje Promedio: $promedioPuntaje<br>⏱️ Tiempo Promedio: $promedioTiempo</p>";

$html .= "<table border='1' cellpadding='5'><tr><th>#</th><th>Usuario</th><th>Puntaje</th><th>Tiempo</th></tr>";
$medallas = ['🥇', '🥈', '🥉'];
foreach ($ranking as $i => $r) {
  $pos = $medallas[$i] ?? ($i + 1);
  $html .= "<tr><td>$pos</td><td>{$r['usuario']}</td><td>{$r['puntaje']}</td><td>{$r['tiempo']}</td></tr>";
}
$html .= "</table>";

$pdf->writeHTML($html);
$pdf->Output("ranking_$insigniaId.pdf", "I");
?>
