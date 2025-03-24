// app.js
document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
});

function updateAuthButton() {
    const authButton = document.getElementById("authButton");
    const isAuthenticated = sessionStorage.getItem("authenticated") === "true";

    if (isAuthenticated) {
        authButton.textContent = "Cerrar Sesión";
        authButton.onclick = logout;
    } else {
        authButton.textContent = "Iniciar Sesión";
        authButton.onclick = loginRedirect;
    }
}

function loginRedirect() {
    console.log("Redirigiendo a login.html");
    window.location.href = "login.html";
}

function login() {
    // Simulación de inicio de sesión
    sessionStorage.setItem("authenticated", "true");
    updateAuthButton();
    console.log("Inicio de sesión exitoso");
    window.location.href = "welcome.html";
}

function logout() {
    // Simulación de cierre de sesión
    sessionStorage.removeItem("authenticated");
    updateAuthButton();
    console.log("Cierre de sesión exitoso");
    window.location.href = "index.html";
}
