let speechSynthesis = window.speechSynthesis;
let speech;
let avatarAnimation = document.getElementById('avatar-animation');
let currentVolume = 1; // Volumen inicial (máximo)
let isMuted = false; // Control de mute
let volumeSlider = document.getElementById('volumeSlider');

// Función para iniciar la narración
function leerContenido() {
    const texto = `
        Pon a prueba tus habilidades y busca el camino hacia la victoria, resolviendo problemas matemáticos...
        Instrucciones: Gami será tu guía durante los niveles del juego...
        1. Escucha a Xilo: Quien leerá un sistema de ecuaciones lineales...
        2. Resuelve el sistema: Debes resolver el sistema de ecuaciones para encontrar los valores de x y y...
        3. Marca tu tarjeta: Si la solución que obtuviste está en tu tarjeta de bingo, marca esa casilla...
        4. Desafíos de Radicux: De vez en cuando, Gami leerá un desafío de ecuaciones más complicado.
    `;

    detenerNarracion(); // Detener cualquier narración en curso antes de empezar

    // Crear una nueva instancia de SpeechSynthesisUtterance para la narración
    speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "es-ES";
    speech.volume = currentVolume; // Establecer el volumen inicial

    // Comienza la narración
    speechSynthesis.speak(speech);

    // Activar animación de hablar
    avatarAnimation.classList.add('talking');

    // Desactivar animación cuando termine la narración
    speech.onend = function () {
        avatarAnimation.classList.remove('talking');
    };
}

// Función para ajustar el volumen con el control deslizante
function adjustVolume(value) {
    currentVolume = value / 100; // Convertir el valor del slider (0-100) a rango de volumen (0-1)
    if (!isMuted) { // Solo si no está en mute
        if (speech) {
            speech.volume = currentVolume; // Actualizar el volumen de la narración
        }
    }
}

// Función para mutear o desmutear
function toggleMute() {
    if (isMuted) {
        currentVolume = volumeSlider.value / 100; // Restaurar volumen original
        isMuted = false;
        volumeSlider.value = currentVolume * 100; // Ajustar el slider al valor restaurado
    } else {
        currentVolume = 0; // Volumen 0 para silenciar
        isMuted = true;
        volumeSlider.value = 0; // Control deslizante en 0
    }

    if (speech) {
        speech.volume = currentVolume; // Aplicar el volumen a la narración
    }
}

// Detener la narración al salir de la página
function detenerNarracion() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Cancelar narración actual
    }
}

// Función para repetir la narración
function repetirNarracion() {
    leerContenido();
}

// Iniciar la narración automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    leerContenido(); // Iniciar narración al cargar la página
});

// Detener narración antes de salir de la página
window.addEventListener("beforeunload", function () {
    detenerNarracion(); // Detener narración antes de abandonar la página
});
