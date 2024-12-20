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
    <link rel="stylesheet" href="nivel 1 juego1.css">
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
        
        <h1> Desafio 1</h1>
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
    <script>

        // Cargar el nombre de usuario y correo desde localStorage
        document.addEventListener("DOMContentLoaded", function() {
            const username = localStorage.getItem("username");
            const useremail = localStorage.getItem("useremail");
            
            if (username) {
                document.getElementById("username").textContent = username;
            }
    
            if (useremail) {
                document.getElementById("useremail").textContent = useremail;
            }
        });
    </script>

        <!-- Contenido Principal -->
    <div class="game-container">
        
            <div class="challenge-header">
                Desafío 1: Bingo de Ecuaciones Lineales
            </div>
            <div class="challenge-info">
                <div class="header-info">
                    <div class="user-section"></div>
                </div>
                <p>TIEMPO: <span id="timer">00:00</span></p>
                <p>Puntos obtenidos: <span id="points">0</span></p>
            </div>
       

                <!-- Avatar y diálogo -->
        <div id="avatar-container" class="avatar-container">
            <img src="img/xilo-avatar.jpg" alt="Avatar" class="avatar" onclick="openAvatarDialog()">
        </div>

        <div id="avatar-dialog" class="avatar-dialog" style="display: none;">
            <div class="dialog-content">
                <span class="close" onclick="closeAvatarDialog()">&times;</span>
                <p id="avatar-text">¡Hola! Soy Xilo, tu asistente de juego. Estoy aquí para ayudarte.</p>
                <button onclick="narrarContenido()">Hablar</button>
            </div>
        </div>

        <!-- Contenido del juego -->
        <div class="content">
            <div class="equation-container">
                <div id="equation-container">
                    <h2>El sistema de ecuaciones es:</h2>
                    <ul id="equation-list"></ul>
                </div>
                <div id="equation" class="equation">x + y = 5, 2x - y = 1</div>
                <button id="prev-btn" onclick="prevEquation()">Regresar</button>
                <button id="next-btn" onclick="nextEquation()">Siguiente</button>
            </div>

            <div class="bingo-container">
                <h2>Bingo</h2>
                <div id="bingo-board" class="bingo-board"></div>
            </div>
        </div>

        <!-- Intentos y botones -->
        <div class="attempts-info">
            <span id="attempts">Intentos restantes: 3</span>
            <button onclick="feliBingo(); reproducirSonidoTrompetas()">¡Bingo!</button>

            <button onclick="restartGame()">Iniciar - Volver a Empezar</button>
        </div>


        <!-- Botones adicionales -->
        <div class="buttons-container">
            <button class="icon-button" onclick="restartGame()">Comenzar</button>
            <button class="icon-button" onclick="verificarYMostrar()">Retroalimentación</button>
        </div>

        <!-- Controles de audio -->
        <div class="audio-buttons-container">
            <button class="audio-button" onclick="playAudio()"><i class="fas fa-play"></i></button>
            <button class="audio-button" onclick="pauseAudio()"><i class="fas fa-pause"></i></button>
            <button class="audio-button" onclick="toggleMute()"><i class="fas fa-volume-mute"></i></button>
            <button class="audio-button" onclick="increaseVolume()"><i class="fas fa-volume-up"></i></button>
            <button class="audio-button" onclick="decreaseVolume()"><i class="fas fa-volume-down"></i></button>
        </div>


        <!-- Modal de Felicitación -->
        <div id="felicitacion-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="cerrarFelicitacion()">&times;</span>
                <h2>🎉 ¡Felicidades! 🎉</h2>
                <p>¡Has completado el Bingo de Ecuaciones Lineales!</p>
                <img src="img/gami.jpg" alt="Gami" class="avatar" />
            </div>
        </div>


        <!-- Modal de retroalimentación -->
        <div id="feedback-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeFeedback()">&times;</span>
                <h2>Retroalimentación</h2>
                <table id="feedback" class="feedback-table">
                    <thead>
                        <tr>
                            <th>Ecuación</th>
                            <th>Solución</th>
                            <th>Tu respuesta</th>
                        </tr>
                    </thead>
                    <tbody id="feedback-table-body"></tbody>
                </table>
                <div class="avatar-feedback">
                    <img src="img/radicux.jpg" alt="Avatar" class="avatar">
                    <p id="feedback-text">Estas fuerón tus respuestas</p>
                    <button onclick="closeFeedback()">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->

    <script src="nivel 1 juego1.js"></script>
    <script>
        let ecuaciones = [
            { ecuacion: 'x + y = 2  2x + y = 5', solucion: 'x = 3 y = -1', respuestaUsuario: '' },
            { ecuacion: '2x + 4y = 0  x + 2y = 4', solucion: 'x = 2 y = -1', respuestaUsuario: '' },
            { ecuacion: '3x + 2y = 11  4x + 5y = 7', solucion: 'x = 3 y = 1', respuestaUsuario: '' },
            { ecuacion: '2x + 3y = -1  3x + 4y = 0', solucion: 'x = 4 y = -3', respuestaUsuario: '' },
            { ecuacion: 'x + 2y = 5  3x - 2y = 19', solucion: 'x = 7 y = 1', respuestaUsuario: '' },

        ];

        // Función para verificar el bingo y mostrar la retroalimentación
        function verificarYMostrar() {
            checkBingo();
            showFeedbackModal();
        }

        function checkBingo() {
    console.log("Verificando bingo...");

   const solution = equationsHistory[currentEquationIndex].solucion; // Solución correcta de la ecuación actual
    const userAnswer = selectedAnswers.join(", "); // Respuesta del usuario combinando casillas seleccionadas

    // Guardar la respuesta del usuario en el historial de ecuaciones
    equationsHistory[currentEquationIndex].respuestaUsuario = userAnswer;

    if (userAnswer === solution) {
        // Incrementar puntos si la respuesta es correcta
        totalPoints += pointsPerCorrectAnswer;
        document.getElementById("points").textContent = totalPoints; // Actualizar los puntos en la pantalla
        alert("¡Bingo! Has encontrado la solución correcta.");
    } else {
        // Reducir el número de intentos restantes
        attempts--;
        document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;

        if (attempts > 0) {
            alert("Respuesta incorrecta. Sigue intentando.");
        } else {
            // Si no quedan intentos, bloquear el juego y mostrar retroalimentación
            lockGame();
            setTimeout(showFeedback, 1000); // Mostrar retroalimentación después de 1 segundo
        }
    }

    // Limpiar respuestas seleccionadas
    selectedAnswers = [];
    const cells = document.querySelectorAll(".cell.selected");
    cells.forEach(cell => cell.classList.remove("selected"));
}


        // Función para registrar la respuesta del usuario
        function registrarRespuesta(ecuacionIndex, respuesta) {
            ecuaciones[ecuacionIndex].respuestaUsuario = respuesta;
        }

        // Función para mostrar el modal de retroalimentación
        function showFeedbackModal() {
            const modal = document.getElementById('feedback-modal');
            const feedbackTableBody = document.getElementById('feedback-table-body');
            feedbackTableBody.innerHTML = "";  // Limpiar la tabla antes de agregar las nuevas filas

            // Iterar sobre las ecuaciones y mostrar la retroalimentación
            ecuaciones.forEach((item, index) => {
                const row = document.createElement("tr");

                // Mostrar ecuación enumerada
                const ecuacionCell = document.createElement("td");
                ecuacionCell.textContent = `Ecuación ${index + 1}: ${item.ecuacion}`;
                row.appendChild(ecuacionCell);

                const solucionCell = document.createElement("td");
                solucionCell.textContent = item.solucion;
                row.appendChild(solucionCell);

                const respuestaCell = document.createElement("td");
                respuestaCell.textContent = item.respuestaUsuario ? item.respuestaUsuario : "No respondida";
                row.appendChild(respuestaCell);

                feedbackTableBody.appendChild(row);
            });

            modal.style.display = 'block';
            narrarFeedback();
        }

        // Narrar retroalimentación
        function narrarFeedback() {
            const texto = document.getElementById('feedback-text').textContent;
            const speech = new SpeechSynthesisUtterance(texto);
            speech.lang = 'es-ES';
            speech.pitch = 1;
            speech.rate = 1;
            speech.volume = 1;
            window.speechSynthesis.speak(speech);
        }

        // Cerrar el modal de retroalimentación
        function closeFeedback() {
            const modal = document.getElementById('feedback-modal');
            modal.style.display = 'none';
        }

        // Dialogo del avatar
        function openAvatarDialog() {
            var dialog = document.getElementById('avatar-dialog');
            dialog.style.display = 'block';
        }

        function closeAvatarDialog() {
            var dialog = document.getElementById('avatar-dialog');
            dialog.style.display = 'none';
        }

        function narrarContenido() {
            const texto = document.getElementById('avatar-text').textContent;
            const speech = new SpeechSynthesisUtterance(texto);
            speech.lang = 'es-ES';
            speech.pitch = 1;
            speech.rate = 1;
            speech.volume = 1;

            const avatar = document.querySelector('.avatar');
            avatar.style.transform = 'scale(1.1)';
            avatar.style.transition = 'transform 0.2s ease-in-out';

            speech.onend = () => {
                avatar.style.transform = 'scale(1)';
            };

            window.speechSynthesis.speak(speech);
        }
    
    </script>
    
</body>
</html>
