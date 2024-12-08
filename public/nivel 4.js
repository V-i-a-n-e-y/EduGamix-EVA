let speechSynthesis = window.speechSynthesis;
let speech;
let avatarAnimation = document.getElementById('avatar-animation');
let currentVolume = 1; // Volumen inicial (máximo)
let isMuted = false; // Control de mute
let volumeSlider = document.getElementById('volumeSlider');

// Función para iniciar la narración
function leerContenido() {
    const texto = `
     Bienvenido al emocionante juego de Cuestionando las soluciones, en donde tendrás que enfrentarte al gran villano matemático de EduGamix, ¡Radicux! Quien cuestionara tus conocimientos. Sigue las instrucciones para jugar y divertirte mientras refuerzas tus conocimientos. ¡Éxito!
        Selecciona el modo de juego.</p>
        Instrucciones: Gami será tu guía durante los niveles del juego, el narrará las actividades.
           <p>1. Escucha a Radicux, ¡si sorprendente!: El leerá una serie de preguntas en voz alta además de presentarlo visualmente
           <p>2. Selecciona la casilla o casillas: Deberás identificar qué respuesta o respuestas son las correctas.    
           <p>3. Oprime siguiente: Al tener tus respuestas correctas pasa a las siguientes preguntas.
           Reglas Adicionales:
           Verifica tu Trabajo: Asegúrate de que tus respuestas sean correctas.
           Participa Activamente: No dejes pasar mucho tiempo, por cada error te quitara tiempo Radicux. 
           Pide Ayuda si la Necesitas: No dudes en pedir una pista a “Xilo” si la necesitas.

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
