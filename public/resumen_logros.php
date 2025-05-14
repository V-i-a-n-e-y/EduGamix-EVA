<?php
require_once 'conexion.php';
$sql = "SELECT username, logros FROM usuarios";
$result = $conn->query($sql);

echo "<h1>Resumen de Logros por Usuario</h1><table border='1' cellpadding='8'><tr><th>Usuario</th><th>Nivel</th><th>Logros</th></tr>";
<a href="exportar_logros_global_pdf.php" target="_blank"
   style="display:inline-block; margin-top:15px; padding:8px 16px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px;">
   📄 Exportar logros globales en PDF
</a>
// Simulación de logros

while ($row = $result->fetch_assoc()) {
  $logros = json_decode($row['logros'], true);
  if (is_array($logros)) {
    foreach ($logros as $nivel => $lista) {
      echo "<tr><td>{$row['username']}</td><td>$nivel</td><td><ul>";
      foreach ($lista as $logro) {
        echo "<li>$logro</li>";
      }
      echo "</ul></td></tr>";
    }
  }
}
echo "</table>";
?>
