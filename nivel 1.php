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
    <link rel="stylesheet" href="nivel 1.css">
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
        <h1>Nivel 1</h1>
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

    <div class="content">
        <p id="texto1">Pon a prueba tus habilidades y busca el camino hacia la victoria, resolviendo problemas matemáticos en nuestro emocionante Bingo de Álgebra Lineal. Encuentra la combinación correcta de vectores y sé el primero en oprimir ¡Bingo! para ganar.</p>
        <p id="texto2">Selecciona el modo de juego.</p>
        <p id="texto3">Instrucciones: Gami será tu guía durante los niveles del juego, él narrará las actividades.</p> 
        <p id="texto4">1. Escucha a Xilo: Quien leerá un sistema de ecuaciones lineales.</p>
        <p id="texto5">2. Resuelve el sistema: Debes resolver el sistema de ecuaciones para encontrar los valores de 𝑥 y 𝑦.</p>      
        <p id="texto6">3. Marca tu tarjeta: Si la solución que obtuviste está en tu tarjeta de bingo, marca esa casilla.</p>
        <p id="texto7">4. Desafíos de Radicux: De vez en cuando, Gami leerá un "Desafío de Radicux", que es un sistema de ecuaciones más complicado.</p>
        <p id="texto8">5. Selecciona el botón de "Bingo": Cuando tengas tus respuestas. Gami verificará las soluciones marcadas para confirmar el ganador.</p>
        <p id="texto9">Reglas Adicionales:</p>
        <p id="texto10">Confirmación de Bingo: Cuando el jugador oprime "Bingo", Gami revisará las soluciones marcadas para asegurar que todas son correctas. Si alguna solución es incorrecta, el juego continúa. ¡Si fallas Radicux se burlará, no lo dejes!</p>
        <p id="texto11">Ayuda: Si necesitas ayuda para resolver un sistema, puedes pedir una pista a Xilo, pero no se te dará la solución completa.</p>
        <button onclick="window.location.href='modo juego n1.php'; detenerNarracion();">Siguiente</button>
        <button onclick="window.location.href='inicio.php'; detenerNarracion();">Regresar a Inicio</button>
    </div>

    <div class="main-container">
        <div id="avatar-animation">
            <img id="gami-avatar" src="img/gami.jpg" alt="Avatar de Gami" style="height: 150px;">
        </div>

        <div class="controls">
            <button id="repeatButton" onclick="leerContenido()">Repetir</button>
            <button id="muteButton" onclick="toggleMute()">Silenciar</button>
        </div>
    </div>

    <script>
        let isMuted = false;
        let currentSpeech = null;

        // Detener narración
        function detenerNarracion() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }

        // Leer contenido con narración
        function leerContenido() {
            detenerNarracion(); // Asegurar que no haya narración activa
            const textos = document.querySelectorAll(".content p");
            textos.forEach((parrafo, index) => {
                setTimeout(() => {
                    narrarTexto(parrafo.innerText);
                }, index * 5000); // Retraso ajustado para cada párrafo
            });
        }

        // Narrar texto
        function narrarTexto(texto) {
            if (isMuted) return;
            currentSpeech = new SpeechSynthesisUtterance(texto);
            currentSpeech.lang = "es-ES";
            currentSpeech.rate = 1;
            currentSpeech.onend = () => console.log("Narración terminada.");
            window.speechSynthesis.speak(currentSpeech);
        }

        // Alternar silencio
        function toggleMute() {
            isMuted = !isMuted;
            detenerNarracion();
            document.getElementById("muteButton").innerText = isMuted ? "Activar Sonido" : "Silenciar";
        }

        // Detener narración al salir de la página
        window.addEventListener('beforeunload', detenerNarracion);

        // Iniciar lectura al cargar
        document.addEventListener("DOMContentLoaded", leerContenido);
    </script>

    <script src="nivel 1.js"></script>
</body>
</html>
