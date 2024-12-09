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

        <div class="badges-container">
            <h2>Insignias</h2>
            <div class="badge-item">
                <p>Descripción de la insignia</p>
            </div>
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
    </script>
</body>
</html>
