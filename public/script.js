const $btnSignIn = document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    // Al hacer clic en el botón "Iniciar Sesión", mostramos el formulario de inicio de sesión
    if (e.target === $btnSignIn) {
        $signIn.classList.add('active');
        $signUp.classList.remove('active');
    }

    // Al hacer clic en el botón "Registrarse", mostramos el formulario de registro
    if (e.target === $btnSignUp) {
        $signUp.classList.add('active');
        $signIn.classList.remove('active');
    }
});
