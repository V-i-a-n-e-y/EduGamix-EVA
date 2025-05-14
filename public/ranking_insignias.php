<?php
session_start();
require_once 'conexion.php';

$usuarioActual = $_SESSION['username'] ?? '';
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

$medallas = ["🥇", "🥈", "🥉"];
$posicionUsuario = null;
foreach ($ranking as $i => $r) {
    if ($r['usuario'] === $usuarioActual) $posicionUsuario = $i + 1;
}

echo "<h2>Ranking: $insigniaId</h2>";
echo "<form method='GET'>
  <input type='hidden' name='insignia' value='$insigniaId'>
  Escuela: <input name='escuela' value='$escuela'>
  Clase: <input name='clase' value='$clase'>
  Grupo: <input name='grupo' value='$grupo'>
  <button>Filtrar</button>
</form>";

echo "<table border='1'><tr><th>#</th><th>Usuario</th><th>Puntaje</th><th>Tiempo</th></tr>";
foreach ($ranking as $i => $r) {
    $pos = $medallas[$i] ?? ($i + 1);
    $highlight = ($r['usuario'] === $usuarioActual) ? "style='background:#e3f2fd;font-weight:bold'" : "";
    echo "<tr $highlight><td>$pos</td><td>{$r['usuario']}</td><td>{$r['puntaje']}</td><td>{$r['tiempo']}</td></tr>";
}
echo "</table>";

if ($posicionUsuario && $posicionUsuario > 3) {
    $r = $ranking[$posicionUsuario - 1];
    echo "<p>📌 Estás en la posición #$posicionUsuario: {$r['usuario']} – Puntaje: {$r['puntaje']} – Tiempo: {$r['tiempo']}</p>";
}

$query = http_build_query(["insignia" => $insigniaId, "escuela" => $escuela, "clase" => $clase, "grupo" => $grupo]);
echo "<a href='exportar_ranking_pdf.php?$query' target='_blank'>🧾 Exportar PDF</a>";
?>
