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
    <title>EduGamix</title>
    <link rel="stylesheet" href="modo juego n1.css">
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
        
        <h1> Inicio</h1>
        <div class="user-info">
            <span class="icon" title="Notificaciones" onclick="alert('Notificaciones');">🔔</span>
            <span class="icon" title="Difusión" onclick="window.location.href='ini2.php';">📢</span>
            <span class="icon" title="Inicio" onclick="window.location.href='inicio.php';">🏠</span>
            <div class="user-info">
                <i class="fas fa-user-circle" style="font-size: 24px; margin-right: 8px;"></i>
                <span id="username"><?php echo $username; ?></span>
                <a class="logout-link" href="logout.php">Cerrar sesión</a>
            </div>
            <span class="icon" title="Perfil" onclick="window.location.href='miespacio.php';">👤</span>
        </div>
    </header>

<div class="container">
    <h2>Selecciona un Modo de Juego:</h2>
    <button onclick="startGame('practica')">Práctica (tiempo indefinido)</button>
    <button onclick="startGame('desafio')">Desafío (5 minutos)</button>
    <button onclick="startGame('supervivencia')">Supervivencia (3 minutos)</button>
</div>

<script>
    // Cargar el nombre de usuario y correo desde localStorage
    document.addEventListener("DOMContentLoaded", function() {
        const username = localStorage.getItem("username");
        const useremail = localStorage.getItem("useremail");
        
        if (username) {
            document.getElementById("username").textContent = `Usuario: ${username}`;
        }

        if (useremail) {
            document.getElementById("useremail").textContent = `Email: ${useremail}`;
        }
    });

    function startGame(mode) {
        let timer;
        let timerInterval;

        if (mode === 'practica') {
            alert('Modo Práctica seleccionado. ¡Buena suerte!');
            // Aquí puedes redirigir a la página del juego o inicializarlo de otra manera.
            window.location.href = 'nivel 1 juego1.php';
        } else if (mode === 'desafio') {
            timer = 300; // 5 minutos
            startTimer(timer);
        } else if (mode === 'supervivencia') {
            timer = 180; // 3 minutos
            startTimer(timer);
        }
    }

    function startTimer(duration) {
        let timerDisplay = document.createElement('div');
        timerDisplay.style.fontSize = '22px';
        timerDisplay.style.marginTop = '20px';
        document.body.appendChild(timerDisplay);
        
        let minutes, seconds;
        timerInterval = setInterval(function() {
            minutes = Math.floor(duration / 60);
            seconds = duration % 60;

            timerDisplay.innerHTML = `TIEMPO: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (--duration < 0) {
                clearInterval(timerInterval);
                alert('¡Tiempo Expirado!'); // Aquí puedes manejar lo que suceda cuando se acabe el tiempo.
            }
        }, 1000);
    }
</script>

</body>
</html>
