let attempts = 3;
let selectedAnswers = [];
let timerInterval;
let equationsHistory = [
    { ecuacion: 'x + y = 2, 2x + y = 5', solucion: 'x = 3, y = -1', respuestaUsuario: '' },
    { ecuacion: '2x + 4y = 0, x + 2y = 4', solucion: 'x = 2, y = -1', respuestaUsuario: '' },
    { ecuacion: '3x + 2y = 11, 4x + 5y = 7', solucion: 'x = 3, y = 1', respuestaUsuario: '' },
    { ecuacion: '2x + 3y = -1, 3x + 4y = 0', solucion: 'x = 4, y = -3', respuestaUsuario: '' },
    { ecuacion: 'x + 2y = 5, 3x - 2y = 19', solucion: 'x = 7, y = 1', respuestaUsuario: '' }
].slice(0, 5);

let currentEquationIndex = 5;
const maxEquations = 5; // Limitar a 5 ecuaciones
const pointsPerCorrectAnswer = 200; // Puntos por respuesta correcta
let totalPoints = 0; // Variable para almacenar los puntos totales

// Función para generar una respuesta aleatoria
function getRandomSolution() {
    const randomSolutions = [
        'x= 1, y= 1',
        'x= 3, y= 1',
        'x= 5, y= -4',
        'x= 0, y= 0',
        'x= -1, y= 2',
        'x= 4, y= -3',
        'x= 2, y= -1',
        'x= 3, y= -1',
        'x= 7, y= 1'
    ];
    const randomIndex = Math.floor(Math.random() * randomSolutions.length);
    return randomSolutions[randomIndex];
}

// Función para mezclar el orden de las respuestas en el tablero
function shuffleArray(array) {
    for (let i = array.length - 5; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
}

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

// Renderizar el tablero de bingo
function renderBingoBoard() {
    const board = document.getElementById("bingo-board");
    board.innerHTML = "";

    const bingoValues = generateBingoValues();
    shuffleArray(bingoValues); // Mezclar las respuestas para el tablero
    bingoValues.forEach(value => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = value;
        cell.onclick = () => {
            if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
                selectedAnswers = selectedAnswers.filter(answer => answer !== value);
            } else if (selectedAnswers.length < 5) { // Cambiar a máximo 1 selección
                cell.classList.add("selected");
                selectedAnswers.push(value);
            } else {
                alert("Solo puedes seleccionar 5 casilla.");
            }
        };
        board.appendChild(cell);
    });
}

// Generar 9 valores aleatorios para el tablero de bingo (3x3)
function generateBingoValues() {
    const values = [];

    while (values.length < 9) { // Genera solo 9 valores
        const randomSolution = getRandomSolution();
        if (!values.includes(randomSolution)) {
            values.push(randomSolution);
        }
    }

    return values;
}

// Cambiar al siguiente sistema de ecuaciones
function nextEquation() {
    if (currentEquationIndex < equationsHistory.length - 5) {
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
        document.getElementById("equation").textContent = `Ecuación ${currentEquationIndex + 1}: ${equation.ecuacion}`;
    }
}

// Función para verificar si se ha encontrado el bingo
function checkBingo() {
    const solution = equationsHistory[currentEquationIndex].solucion;
    const userAnswer = selectedAnswers.join(", "); // Combinar respuestas seleccionadas

    // Guardar la respuesta del usuario en el historial de ecuaciones
    equationsHistory[currentEquationIndex].respuestaUsuario = userAnswer;

    if (userAnswer === solution) {
        // Sumar puntos al total
        totalPoints += pointsPerCorrectAnswer;
        document.getElementById("points").textContent = totalPoints; // Actualizar puntos en el DOM
        alert("¡Bingo! Has encontrado la solución correcta.");
    } else {
        attempts--;
        document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;

        // Verificar si se han agotado los intentos
        if (attempts > 0) {
            alert("Respuesta incorrecta. Sigue intentando.");
        } else {
            lockGame(); // Bloquea el juego
            setTimeout(showFeedback, 1000); // Mostrar retroalimentación después de 1 segundo
        }
    }

    // Limpiar respuestas seleccionadas
    selectedAnswers = [];
    const cells = document.querySelectorAll(".cell.selected");
    cells.forEach(cell => cell.classList.remove("selected"));
}

// Función para mostrar retroalimentación en tabla
function showFeedback() {
    const feedbackTable = document.querySelector("#feedback tbody");
    feedbackTable.innerHTML = ""; // Limpiar la tabla

    equationsHistory.forEach((equation, index) => {
        const userAnswer = equation.respuestaUsuario || "N/A"; // Mostrar la respuesta del usuario guardada en la ecuación
        const row = `
            <tr>
                <td>${equation.ecuacion}</td>
                <td>${equation.solucion}</td>
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
    attempts = 3;
    selectedAnswers = [];
    equationsHistory.forEach(equation => equation.respuestaUsuario = ''); // Resetear las respuestas
    currentEquationIndex = -1;
    totalPoints = 0;

    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "00:00";    

    document.getElementById("points").textContent = "0"; 
    document.getElementById("attempts").textContent = "Intentos restantes: 3";
    document.getElementById("feedback-modal").style.display = "none";

    renderBingoBoard();
    startTimer();
    nextEquation();
}
