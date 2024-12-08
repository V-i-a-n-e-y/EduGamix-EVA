let speechSynthesis = window.speechSynthesis;
let speech;
let avatarAnimation = document.getElementById('avatar-animation');
let currentVolume = 1; // Volumen inicial (máximo)
let isMuted = false; // Control de mute
let volumeSlider = document.getElementById('volumeSlider');

// Función para iniciar la narración
function leerContenido() {
    const texto = `
        Bienvenid@ al emocionante juego de Explorando Soluciones Lineales, en donde tendrás clasificar los sistemas de ecuaciones lineales . 
        Sigue las instrucciones para jugar y divertirte mientras refuerzas tus conocimientos para resolver la clasificación y tipos de sistemas de ecuaciones lineales, ¡Éxito!.
        Instrucciones: Gami será tu guía durante los niveles del juego, el narrará las actividades.
        Selecciona el modo de juego.
        
            1. Escucha a Gami: El leerá un sistema de ecuaciones lineales en voz alta además de presentarlo visualmente.
            2. Clasifica el Sistema: Deberás identificar el tipo de solución del sistema de ecuaciones presentado.       
            3. Selecciona la Imagen: En tu tarjeta de juego, selecciona la imagen que representa correctamente el tipo de solución que identificaste. Por ejemplo, si la solución es infinita, busca la imagen que represente "soluciones infinitas".
            4. Desafíos de Radicux: De vez en cuando, Gami leerá un "Desafío de Radicux", que es un sistema de ecuaciones más complicado. 
            5. Oprime "¡Ganador!": El primer jugador en completar la relación correcta de todas las imágenes en su tarjeta de juego debe oprimir "¡Ganador!". Gami verificará las soluciones y las imágenes seleccionadas para confirmar el ganador.                  
                   
           Reglas Adicionales:
           Pide Ayuda si la Necesitas: No dudes en pedir una pista a “Xilo” si te quedas atascado.
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
