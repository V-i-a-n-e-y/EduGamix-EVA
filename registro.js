document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.registration-form');

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validación básica en el cliente
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            // Enviar datos al servidor de forma segura
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registro exitoso');
                // Redirigir o realizar otra acción tras el registro exitoso
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el registro, intenta nuevamente');
        }
    });
});
