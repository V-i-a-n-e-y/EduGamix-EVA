// Selección de elementos del DOM
const xiloAvatar = document.getElementById('avatar-container-xilo');
const gamiAvatar = document.getElementById('avatar-container-gami');
const dialogoXilo = document.getElementById('dialogo-xilo');
const dialogoGami = document.getElementById('dialogo-gami');
const closeButtons = document.querySelectorAll('.close');

// Función para mostrar un cuadro de diálogo
function mostrarDialogo(idDialogo, texto) {
    const dialogo = document.getElementById(idDialogo);
    const contenido = dialogo.querySelector('.dialog-content');

    cerrarTodosLosDialogos(); // Asegúrate de cerrar los demás diálogos
    contenido.innerHTML = texto;
    dialogo.style.display = 'block';
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

// Eventos para los avatares
xiloAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-xilo', '¡Hola! Soy Xilo, ¿en qué puedo ayudarte hoy?');
});

gamiAvatar.addEventListener('click', () => {
    mostrarDialogo('dialogo-gami', '¡Hola! Soy Gami, lista para trabajar contigo.');
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
        narrador.rate = 1;
        narrador.onend = () => console.log("Narración terminada.");
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(narrador);
    }

    mostrarTexto();
}

// Detener narración al salir de la página
window.addEventListener('beforeunload', detenerNarracion);