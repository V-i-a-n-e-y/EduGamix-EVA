let speechSynthesis = window.speechSynthesis;
let speech;
let avatarAnimation = document.getElementById('avatar-animation');
let currentVolume = 1; // Volumen inicial (máximo)
let isMuted = false; // Control de mute
let volumeSlider = document.getElementById('volumeSlider');

// Función para iniciar la narración
function leerContenido() {
    const texto = `
    Bienvenidos al emocionante juego de Laberinto Espacial, en donde tendrás que ayudar a Xilo a llegar a su casa, ¡Ten cuidado! No lo vayas a guiar a la guarida de Radicux. Sigue las instrucciones para jugar y divertirte mientras refuerzas tus conocimientos ¡Éxito!.
    Escucha a Gami: El leerá un sistema de ecuaciones lineales en voz alta además de presentarlo visualmente. {x+y=22x+2y=4​
    Clasifica el Sistema: Deberás identificar el tipo de solución del sistema de ecuaciones presentado.    
    Selecciona la casilla: Marca la casilla con la respuesta correcta que te dará cuantos pasos y la dirección que dará Xilo en el camino.
    Desafíos de Radicux: De vez en cuando, Gami leerá un "Desafío de Radicux", que es un sistema de ecuaciones más complicado.
    Oprime "¡Finalizar!": Cundo tengas todas las coordenadas Xilo avanzará, Gami te dirá si lo llevaste por el buen camino o al camino de la oscuridad                     
    Reglas Adicionales:
     erifica tu Trabajo: Asegúrate de que tus coordenadas sean correctas antes de gráficar.
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
