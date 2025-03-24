// Selección de elementos del DOM
const xiloAvatar = document.getElementById('avatar-container-xilo');
const gamiAvatar = document.getElementById('avatar-container-gami');
const dialogoXilo = document.getElementById('dialogo-xilo');
const dialogoGami = document.getElementById('dialogo-gami');
const closeButtons = document.querySelectorAll('.close');

// Variables para las voces de Xilo y Gami
let xiloVoice = null;
let gamiVoice = null;

// Cargar voces disponibles y asignarlas
function cargarVoces() {
    const voces = window.speechSynthesis.getVoices();

    // Asignar voces específicas a los personajes
    xiloVoice = voces.find(voice => voice.name.includes("Google español") && voice.gender === "male") || voces[0];
    gamiVoice = voces.find(voice => voice.name.includes("Google español") && voice.gender === "female") || voces[1];

    if (!xiloVoice || !gamiVoice) {
        console.warn("No se encontraron las voces deseadas. Usando voces predeterminadas.");
    }
}

// Escuchar cambios en las voces (algunos navegadores cargan voces de forma asincrónica)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = cargarVoces;
} else {
    cargarVoces(); // Cargar las voces inmediatamente si ya están disponibles
}

// Función para mostrar un cuadro de diálogo y narrar el texto
function mostrarDialogo(idDialogo, texto, voz) {
    const dialogo = document.getElementById(idDialogo);
    const contenido = dialogo.querySelector('.dialog-content');

    cerrarTodosLosDialogos(); // Asegúrate de cerrar los demás diálogos
    contenido.innerHTML = texto;
    dialogo.style.display = 'block';

    narrarTexto(texto, voz); // Llama a la función para narrar el texto con una voz específica
}

// Función para cerrar todos los diálogos
function cerrarTodosLosDialogos() {
    dialogoXilo.style.display = 'none';
    dialogoGami.style.display = 'none';
}

// Función para cerrar un diálogo específico
function cerrarDialogo(idDialogo) {
    const dialogo = document.getElementById(idDialogo);
    dialogo.style.display = 'none';
}

// Función para narrar texto usando una voz específica
function narrarTexto(texto, voz) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);

        utterance.lang = 'es-ES'; // Establece el idioma (español)
        utterance.voice = voz; // Asigna la voz específica
        synth.cancel(); // Detén cualquier narración en curso
        synth.speak(utterance); // Inicia la narración
    } else {
        console.warn('La API de Speech Synthesis no es compatible con este navegador.');
    }
}

// Eventos para los avatares
xiloAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-xilo', '¡Soy Xilo, tu guía en esta aventura. Siempre estoy dispuesto a ayudarte a superar los desafíos!', xiloVoice);
});

gamiAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-gami', '¡Soy Gami, el narrador de tus retos matemáticos. Siempre estoy listo para plantearte nuevos desafíos!', gamiVoice);
});

// Eventos de cierre de diálogos
closeButtons.forEach(button => {
    button.addEventListener('click', () => cerrarTodosLosDialogos());
});

// Función para mostrar modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block'; // Mostrar modal
    }
}

// Función para cerrar modales
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // Ocultar modal
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Ocultar modal
        }
    });
};

// Narración con animación
function narrarConAnimacion(idTexto, texto, avatar) {
    const textoDiv = document.getElementById(idTexto);
    textoDiv.innerHTML = "";
    let index = 0;

    function mostrarTexto() {
        if (index < texto.length) {
            textoDiv.innerHTML += texto.charAt(index);
            index++;
            setTimeout(mostrarTexto, 50);
        }
    }

    // Mostrar el diálogo correspondiente
    if (avatar === "xilo") {
        mostrarDialogo("dialogo-xilo", texto);
    } else if (avatar === "gami") {
        mostrarDialogo("dialogo-gami", texto);
    }

    // Narrar el texto si está habilitado
    if ('speechSynthesis' in window) {
        const narrador = new SpeechSynthesisUtterance(texto);
        narrador.lang = "es-ES";
        narrador.rate = 2;
        narrador.onend = () => console.log("Narración terminada.");
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(narrador);
    }

    mostrarTexto();
}

function cargarVoces() {
    const voces = window.speechSynthesis.getVoices();
    xiloVoice = voces.find(voice => voice.name.includes("Google español") && voice.lang.startsWith("es")) || voces[0];
    gamiVoice = voces.find(voice => voice.name.includes("Google español") && voice.lang.startsWith("es")) || voces[1];

    if (!xiloVoice || !gamiVoice) {
        console.warn("No se encontraron las voces deseadas. Usando voces predeterminadas.");
    }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = cargarVoces;
} else {
    cargarVoces();
}

function mostrarDialogo(idDialogo, texto, voz) {
    const dialogo = document.getElementById(idDialogo);
    const contenido = dialogo.querySelector('.dialog-content');

    cerrarTodosLosDialogos(); // Cierra cualquier otro diálogo abierto
    contenido.innerHTML = texto;
    dialogo.style.display = 'block';

    narrarTexto(texto, voz); // Inicia la narración
}

function cerrarTodosLosDialogos() {
    dialogoXilo.style.display = 'none';
    dialogoGami.style.display = 'none';
    detenerNarracion(); // Detiene la narración al cerrar
}

function cerrarDialogo(idDialogo) {
    const dialogo = document.getElementById(idDialogo);
    dialogo.style.display = 'none';
    detenerNarracion();
}

function narrarTexto(texto, voz) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-ES';
        if (voz) {
            utterance.voice = voz;
        }
        synth.cancel();
        synth.speak(utterance);
    } else {
        console.warn('La API de Speech Synthesis no es compatible con este navegador.');
    }
}

function detenerNarracion() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

// Eventos para los avatares
xiloAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-xilo', '¡Soy Xilo, tu guía en esta aventura. Siempre estoy dispuesto a ayudarte a superar los desafíos!', xiloVoice);
});

gamiAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-gami', '¡Soy Gami, el narrador de tus retos matemáticos. Siempre estoy listo para plantearte nuevos desafíos!', gamiVoice);
});

// Eventos de cierre de diálogos
closeButtons.forEach(button => {
    button.addEventListener('click', () => cerrarTodosLosDialogos());
});

// Cerrar narración al salir de la página
window.addEventListener('beforeunload', detenerNarracion);

// Detener narración al salir de la página
window.addEventListener('beforeunload', detenerNarracion);