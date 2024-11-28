// Función para abrir la ventana emergente
function openPopup() {
    document.getElementById("messagePopup").style.display = "block";
}

// Función para cerrar la ventana emergente
function closePopup() {
    document.getElementById("messagePopup").style.display = "none";
}

// Función para enviar el mensaje (puedes personalizarla según tus necesidades)
function sendMessage() {
    const message = document.querySelector("#messagePopup textarea").value;
    if (message.trim() !== "") {
        alert("Mensaje enviado: " + message);
        closePopup();
    } else {
        alert("Por favor escribe un mensaje.");
    }
}
function logout() {
    // Lógica para cerrar sesión
    alert("Sesión cerrada correctamente");
    // Redirige o limpia la información del usuario según sea necesario
}
// Desplazar contenido en Potenciadores, Insignias e Identificadores
function scrollContent(section, direction) {
    const container = document.querySelector(`.${section} .slider-content`);
    const scrollAmount = container.offsetWidth / 3;
    container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    });
}