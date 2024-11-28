let attempts = 3;
let selectedAnswers = [];
let timerInterval;
let equationsHistory = [];
let currentEquationIndex = -1;
const maxEquations = 5; // Limitar a 5 ecuaciones
const pointsPerCorrectAnswer = 200; // Puntos por respuesta correcta
let totalPoints = 0; // Variable para almacenar los puntos totales

// Función para actualizar el temporizador
function startTimer() {
    let elapsedTime = 0;
    timerInterval = setInterval(() => {
        elapsedTime++;
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        document.getElementById("timer").textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Bloquear el juego
function lockGame() {
    clearInterval(timerInterval);
    document.getElementById("bingo-board").style.pointerEvents = "none";
    document.getElementById("attempts").textContent = "Juego terminado.";
}

// Generar un sistema aleatorio de ecuaciones lineales
function generateRandomEquation() {
    const a1 = Math.floor(Math.random() * 10) + 1;
    const b1 = Math.floor(Math.random() * 10) + 1;
    const c1 = Math.floor(Math.random() * 20) - 10;

    const a2 = Math.floor(Math.random() * 10) + 1;
    const b2 = Math.floor(Math.random() * 10) + 1;
    const c2 = Math.floor(Math.random() * 20) - 10;

    const equationText = `${a1}x + ${b1}y = ${c1}, ${a2}x + ${b2}y = ${c2}`;
    const determinant = a1 * b2 - a2 * b1;

    if (determinant !== 0) {
        const x = (c1 * b2 - c2 * b1) / determinant;
        const y = (a1 * c2 - a2 * c1) / determinant;
        return { text: equationText, solution: { x: Math.round(x), y: Math.round(y) } };
    } else {
        return generateRandomEquation();
    }
}

// Renderizar el tablero de bingo
function renderBingoBoard() {
    const board = document.getElementById("bingo-board");
    board.innerHTML = "";

    const bingoValues = generateBingoValues();
    bingoValues.forEach(value => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = value;
        cell.onclick = () => {
            if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
                selectedAnswers = selectedAnswers.filter(answer => answer !== value);
            } else if (selectedAnswers.length < 5) {
                cell.classList.add("selected");
                selectedAnswers.push(value);
            } else {
                alert("Solo puedes seleccionar hasta 5 casillas.");
            }
        };
        board.appendChild(cell);
    });
}

// Generar 9 valores aleatorios para el tablero de bingo (3x3)
function generateBingoValues() {
    const values = [];

    while (values.length < 9) { // Genera solo 9 valores
        const x = Math.floor(Math.random() * 11) - 5;
        const y = Math.floor(Math.random() * 11) - 5;
        const pair = `(${x}, ${y})`;

        if (!values.includes(pair)) values.push(pair);
    }

    return values;
}


// Cambiar al siguiente sistema de ecuaciones
function nextEquation() {
    if (currentEquationIndex < equationsHistory.length - 1) {
        currentEquationIndex++;
    } else if (equationsHistory.length < maxEquations) {
        const newEquation = generateRandomEquation();
        equationsHistory.push(newEquation);
        currentEquationIndex++;
    } else {
        alert("Se ha alcanzado el número máximo de ecuaciones.");
    }

    updateEquation();
}

// Cambiar al sistema de ecuaciones anterior
function prevEquation() {
    if (currentEquationIndex > 0) {
        currentEquationIndex--;
        updateEquation();
    }
}

// Actualizar el texto del sistema de ecuaciones
function updateEquation() {
    const equation = equationsHistory[currentEquationIndex];
    if (equation) {
        document.getElementById("equation").textContent = `Ecuación ${currentEquationIndex + 1}: ${equation.text}`;
    }
}

// Función para verificar si se ha encontrado el bingo
function checkBingo() {
    const solution = equationsHistory[currentEquationIndex].solution;
    const solutionString = `(${solution.x}, ${solution.y})`;

    if (selectedAnswers.includes(solutionString)) {
        // Sumar puntos al total
        totalPoints += pointsPerCorrectAnswer;
        document.getElementById("points").textContent = totalPoints; // Actualizar puntos en el DOM
        alert("¡Bingo! Has encontrado la solución correcta.");
    } else {
        attempts--;
        document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;

        // Verificar si se han agotado los intentos
        if (attempts > 0) {
            alert("Sigue intentando.");
        } else {
            lockGame(); // Bloquea el juego
            setTimeout(showFeedback, 1000); // Mostrar retroalimentación después de 1 segundo
        }
    }
}

// Función para mostrar retroalimentación en tabla
function showFeedback() {
    const feedbackTable = document.querySelector("#feedback tbody");
    feedbackTable.innerHTML = ""; // Limpiar la tabla

    equationsHistory.forEach((equation, index) => {
        const solution = equation.solution;
        const userAnswer = selectedAnswers[index] || "N/A";
        const row = `
            <tr>
                <td>${equation.text}</td>
                <td>(${solution.x}, ${solution.y})</td>
                <td>${userAnswer}</td>
            </tr>
        `;
        feedbackTable.innerHTML += row;
    });

    document.getElementById("feedback-modal").style.display = "block"; // Mostrar el modal de retroalimentación
}


// Función para cerrar la ventana de retroalimentación
function closeFeedback() {
    document.getElementById("feedback-modal").style.display = "none";
}


// Reiniciar el juego
function restartGame() {
    // Restablecer puntos, intentos y respuestas
    attempts = 3;
    selectedAnswers = [];
    equationsHistory = [];
    currentEquationIndex = -1;
    totalPoints = 0;

    // Resetear el temporizador
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "00:00";    

    // Restablecer la interfaz
    document.getElementById("points").textContent = "0"; // Resetear puntos
    document.getElementById("attempts").textContent = "Intentos restantes: 3"; // Restablecer intentos
    document.getElementById("feedback-modal").style.display = "none";

    // Volver a generar el tablero y las ecuaciones
    renderBingoBoard();
    startTimer();
    nextEquation();

    // Restablecer el estado de las casillas
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("selected");  // Eliminar la clase 'selected'
        cell.style.pointerEvents = "auto";  // Habilitar la interacción
    });

    // Reactivar la interacción del tablero
    document.getElementById("bingo-board").style.pointerEvents = "auto";
    // Función para abrir el cuadro de diálogo del avatar
function openAvatarDialog() {
    document.getElementById("avatar-dialog").style.display = "block";
}

// Selecciona el contenedor del avatar y el cuadro de diálogo
const avatarContainer = document.querySelector('.avatar-container');
const avatarDialog = document.querySelector('.avatar-dialog');
const closeBtn = document.querySelector('.avatar-dialog .close');

// Muestra el cuadro de diálogo cuando el avatar es clickeado
avatarContainer.addEventListener('click', () => {
    avatarDialog.style.display = 'block';  // Muestra el cuadro de diálogo
});

// Cierra el cuadro de diálogo cuando se hace clic en la "x"
closeBtn.addEventListener('click', () => {
    avatarDialog.style.display = 'none';  // Oculta el cuadro de diálogo
});

// Cierra el cuadro de diálogo si se hace clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === avatarDialog) {
        avatarDialog.style.display = 'none';  // Oculta el cuadro de diálogo si se hace clic fuera
    }
});




}
