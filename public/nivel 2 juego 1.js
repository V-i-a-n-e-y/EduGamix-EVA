<script>
        function verificarRespuesta(esCorrecto, boton) {
            const mensaje = document.getElementById("mensaje");
            mensaje.classList.add("mostrar");
            if (esCorrecto) {
                mensaje.innerText = "La respuesta es correcta, eres imparable.";
                mensaje.style.color = "green";
                boton.style.backgroundColor = "#28a745";
            } else {
                mensaje.innerText = "Respuesta incorrecta, intenta de nuevo.";
                mensaje.style.color = "red";
                boton.style.backgroundColor = "#dc3545";
            }
            setTimeout(() => {
                mensaje.classList.remove("mostrar");
                boton.style.backgroundColor = boton.classList.contains("correcto") ? "#d9534f" : "#5bc0de";
            }, 2000);
        }
    </script>