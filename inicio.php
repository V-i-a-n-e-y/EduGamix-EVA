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
    <link rel="stylesheet" href="inicio.css">
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
            <span class="icon" title="Inicio" onclick="window.location.href='inicio.html;">🏠</span>
            <div class="user-info">
                <i class="fas fa-user-circle" style="font-size: 24px; margin-right: 8px;"></i>
                <span id="username"><?php echo $username; ?></span>
                <a class="logout-link" href="logout.php">Cerrar sesión</a>
            </div>
            <span class="icon" title="Perfil" onclick="window.location.href='miespacio.php';">👤</span>
        </div>
    </header>

<!-- Contenido principal -->
<div class="main-content">
    
    <!-- Ruta de progreso -->
    <div class="progress-road">
        <div class="road">
            <div class="road-point" onclick="openModal('modal1')">
                <div class="point-icon yellow"></div>
                <p>Definición de sistemas de ecuaciones lineales</p>
            </div>

            <div class="road-point" onclick="openModal('modal2')">
                <div class="point-icon red"></div>
                <p>Clasificación de los sistemas de ecuaciones lineales</p>
            </div>

            <div class="road-point" onclick="openModal('modal3')">
                <div class="point-icon green"></div>
                <p>Métodos de solución de ecuaciones</p>
            </div>

            <div class="road-point" onclick="openModal('modal4')">
                <div class="point-icon light-green"></div>
                <p>Interpretación geométrica</p>
            </div>

            <div class="road-point" onclick="openModal('modal5')">
                <div class="point-icon blue"></div>
                <p>Aplicaciones</p>
            </div>
        </div>
    </div>
</div>


  <!-- Modales -->
  <div id="modal1" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('modal1')">&times;</span>
        <h2>Definición de sistemas de ecuaciones lineales</h2>
        <p>Aquí aprenderás los fundamentos básicos de los sistemas de ecuaciones lineales.</p>
        <button onclick="window.location.href='nivel 1.php'">Ir a Nivel 1</button>
    </div>
</div>

<div id="modal2" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('modal2')">&times;</span>
        <h2>Clasificación de los sistemas de ecuaciones lineales</h2>
        <p>Aprende a clasificar los diferentes tipos de sistemas de ecuaciones.</p>
        <button onclick="window.location.href='nivel 2.html'">Ir a Nivel 2</button>
    </div>
</div>

<div id="modal3" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('modal3')">&times;</span>
        <h2>Métodos de solución de ecuaciones</h2>
        <p>Explora los distintos métodos para resolver ecuaciones lineales.</p>
        <button onclick="window.location.href='nivel 3.html'">Ir a Nivel 3</button>
    </div>
</div>

<div id="modal4" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('modal4')">&times;</span>
        <h2>Interpretación geométrica</h2>
        <p>Comprende cómo se interpretan los sistemas de ecuaciones en el plano cartesiano.</p>
        <button onclick="window.location.href='nivel 4.html'">Ir a Nivel 4</button>
    </div>
</div>

<div id="modal5" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('modal5')">&times;</span>
        <h2>Aplicaciones</h2>
        <p>Descubre las aplicaciones prácticas de los sistemas de ecuaciones lineales.</p>
        <button onclick="window.location.href='nivel 5.html'">Ir a Nivel 5</button>
    </div>
</div>


<!-- Avatar de Xilo -->
<div id="avatar-container-xilo">
    <img src="img/xilo-avatar.jpg" alt="Xilo" class="avatar">
</div>

<!-- Avatar de Gami -->
<div id="avatar-container-gami">
    <img src="img/gami.jpg" alt="Gami" class="avatar-gami">
</div>

<!-- Cuadro de diálogo de Xilo -->
<div id="dialogo-xilo" class="avatar-dialog">
    <span class="close" onclick="cerrarDialogo('dialogo-xilo')">&times;</span>
    <div class="dialog-content" id="texto-xilo"></div>
</div>

<!-- Cuadro de diálogo de Gami -->
<div id="dialogo-gami" class="avatar-dialog">
    <span class="close" onclick="cerrarDialogo('dialogo-gami')">&times;</span>
    <div class="dialog-content" id="texto-gami"></div>
</div>


<script src="inicio.js"></script>
</body>
</html>