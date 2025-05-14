<?php
session_start();
$username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : 'Jugador';
$useremail = isset($_SESSION['useremail']) ? htmlspecialchars($_SESSION['useremail']) : 'correo@ejemplo.com';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduGamix - Mi espacio</title>
    <link rel="stylesheet" href="miespacio.css">
    <link rel="icon" href="img/icono.jpg" type="image.jpg">
</head>
<body>
    <!-- Encabezado -->
    <header>
        <div class="logo">
            <a href="index.html" target="_blank">
                <img src="img/EduGamix.jpg" alt="EduGamix Logo" height="150">
            </a>
        </div>
        <h1>Mi espacio</h1>
        <div class="user-info">
            <span class="icon" onclick="alert('Notificaciones');">🔔</span>
            <span class="icon" title="Difusión" onclick="window.location.href='ini2.html';">📢</span>
            <span class="icon" title="Inicio" onclick="window.location.href='inicio.php';">🏠</span>
            <div class="user-info">
                <i class="fas fa-user-circle" style="font-size: 24px; margin-right: 8px;"></i>
                <span id="username"><?php echo $username; ?></span> | <!--<span id="useremail"><?php echo $useremail; ?></span>-->
                <a class="logout-link" href="logout.php">Cerrar sesión</a>
            </div>
            <!-- Perfil -->
            <span class="icon" onclick="window.location.href='miespacio.php';">👤</span>
        </div>
    </header>

    <!-- Contenido principal -->
    <main class="main-container">
        <!-- Evaluación -->
        <div class="evaluation-container">
            <h2>Evaluación</h2>
            <div class="evaluation-item">📍 Puntos obtenidos del nivel 1 0/1000</div>
            <div class="evaluation-item">📍 Puntos obtenidos del nivel 2 0/1000</div>
            <div class="evaluation-item">📍 Puntos obtenidos del nivel 3 0/1000</div>
            <div class="evaluation-item">📍 Puntos obtenidos del nivel 4 0/1000</div>
            <div class="evaluation-item">📍 Puntos obtenidos del nivel 5 0/1000</div>
        </div>

        <!-- Mi avance -->
        <div class="progress-container">
            <h2>Mi avance</h2>
            <div class="progress-item">
                👤 <span><?php echo $username; ?></span>
            </div>
            <div class="progress-item">
                📍 <span>Nivel</span>
            </div>
            <div class="progress-item">
                🔋 <span>Porcentaje de avance</span>
            </div>
        </div>

        <!-- Secciones Identificadores, Insignias y Potenciadores -->
        <div class="identifiers-container">
            <h2>Identificadores</h2>
            <div class="identifier-item">
                <p>Descripción del identificador</p>
            </div>
        </div>

<div class="badge-item">
<?php
require_once 'conexion.php';
if (isset($_SESSION['useremail'])) {
    $email = $_SESSION['useremail'];
    $sql = "SELECT insignias FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($insigniasJson);
    if ($stmt->fetch() && $insigniasJson) {
        $insignias = json_decode($insigniasJson, true);
        if (!empty($insignias)) {
            echo "<ul>";
            foreach ($insignias as $nivel => $badge) {
                echo "<li><strong>" . ucfirst($nivel) . ":</strong> $badge</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>Aún no has ganado ninguna insignia.</p>";
        }
    } else {
        echo "<p>Aún no has ganado ninguna insignia.</p>";
    }
    $stmt->close();
}
?>
</div>
        <div class="badges-container">
            <h2>Insignias</h2>
            <div class="badge-item">
                <p>Descripción de la insignia</p>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
     const insigniaNivel2 = localStorage.getItem("insignia_nivel2");
     if (insigniaNivel2) {
        alert(`Insignia obtenida: ${insigniaNivel2}`);
     } else {
        alert("Aún no has obtenido ninguna insignia del Nivel 2.");
     }
      });

</script>
   <!-- miespacio.html -->
<div id="mis-insignias"></div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const insigniaNivel2 = localStorage.getItem("insignia_nivel2");
    const contenedor = document.getElementById("mis-insignias");
    if (insigniaNivel2) {
      contenedor.innerHTML = `<p>Insignia obtenida: ${insigniaNivel2}</p>`;
    } else {
      contenedor.innerHTML = "<p>Aún no has obtenido ninguna insignia del Nivel 2.</p>";
    }
  });
</script>

            </div>
            <div class="badge-item">
                <p>Descripción de la insignia</p>
            </div>
            <div class="badge-item">
                <p>Descripción de la insignia</p>   

<?php
$insigniasDisponibles = [
  "explorador_logico" => [
    "nombre" => "💡 Explorador Lógico",
    "imagen" => "img/insignias/explorador.png"
  ],
  "visionario_aprendizaje" => [
    "nombre" => "🏆 Visionario del Aprendizaje",
    "imagen" => "img/insignias/visionario.png"
  ]
];
?>
    
    
        </div>

        <div class="boosters-container">
            <h2>Potenciadores</h2>
            <div class="booster-item">
                <p>Descripción del potenciador</p>
            </div>
        </div>
    </main>

    <script>
        function logout() {
            alert("Cerrando sesión...");
        }
        // Simulación de logros

        $sql = "SELECT logros FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_SESSION['useremail']);
$stmt->execute();
$stmt->bind_result($logrosJson);
if ($stmt->fetch()) {
    $logros = json_decode($logrosJson, true);
    foreach ($logros as $nivel => $lista) {
        echo "<h4>Logros de $nivel</h4><ul>";
        foreach ($lista as $logro) {
            echo "<li>$logro</li>";
        }
        echo "</ul>";
    }
}
        function showNotification(message) {
            alert(message);
        }

        // Simulación de logros
        const logros = {
            "nivel1": ["Logro 1", "Logro 2"],
            "nivel2": ["Logro 3"]
        };

        for (const nivel in logros) {
            logros[nivel].forEach(logro => {
                showNotification(`¡Has desbloqueado un logro en ${nivel}: ${logro}!`);
            });
        }

        <a href="exportar_logros_pdf.php" target="_blank"
   style="display:inline-block; margin-top:10px; padding:8px 16px; background:#2196f3; color:white; text-decoration:none; border-radius:5px;">
   📄 Exportar logros en PDF
</a>

    </script>
</body>
</html>
