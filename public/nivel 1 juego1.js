let attempts = 1; // Limitar a un solo intento
let selectedAnswers = [];  // Lista para almacenar las respuestas de las ecuaciones
let timerInterval;
let equationsHistory = [
    { ecuacion: 'x + y = 2, 2x + y = 5', solucion: 'x = 3 y = -1', respuestaUsuario: '', casillaSeleccionada: '' },
    { ecuacion: '2x + 4y = 0, x + 2y = 4', solucion: 'x = 2 y = -1', respuestaUsuario: '', casillaSeleccionada: '' },
    { ecuacion: '3x + 2y = 11, 4x + 5y = 7', solucion: 'x = 3 y = 1', respuestaUsuario: '', casillaSeleccionada: '' },
    { ecuacion: '2x + 3y = -1, 3x + 4y = 0', solucion: 'x = 4 y = -3', respuestaUsuario: '', casillaSeleccionada: '' },
    { ecuacion: 'x + 2y = 5, 3x - 2y = 19', solucion: 'x = 7 y = 1', respuestaUsuario: '', casillaSeleccionada: '' }
].slice(0, 5); // Limitar el array a 5 ecuaciones

let currentEquationIndex = 0;
const maxEquations = 5; // Máximo de ecuaciones permitido
const pointsPerCorrectAnswer = 200; // Puntos por respuesta correcta
let totalPoints = 0;

// Función para generar una respuesta aleatoria
function getRandomSolution() {
    const randomSolutions = [
        'x= 1 y= 1',
        'x= 3 y= 1',
        'x= 5 y= -4',
        'x= 0 y= 0',
        'x= -1 y= 2',
        'x= 4 y= -3',
        'x= 2 y= -1',
        'x= 3 y= -1',
        'x= 7 y= 1'
    ];
    const randomIndex = Math.floor(Math.random() * randomSolutions.length);
    return randomSolutions[randomIndex];
}

// Función para mezclar el orden de las respuestas en el tablero
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
    shuffleArray(bingoValues);
    bingoValues.forEach(value => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = value;
        cell.onclick = () => {
            // Si ya se ha seleccionado una respuesta para esta ecuación, no se puede cambiar
            if (selectedAnswers[currentEquationIndex] === undefined) { // Solo permitir selección si no hay respuesta
                cell.classList.add("selected");
                selectedAnswers[currentEquationIndex] = value;  // Almacenar la respuesta para la ecuación actual
            }
        };
        board.appendChild(cell);
    });
}

// Generar 9 valores aleatorios para el tablero de bingo (3x3)
function generateBingoValues() {
    const values = [];

    while (values.length < 9) {
        const randomSolution = getRandomSolution();
        if (!values.includes(randomSolution)) {
            values.push(randomSolution);
        }
    }

    return values;
}

// Cambiar al siguiente sistema de ecuaciones
function nextEquation() {
    if (selectedAnswers[currentEquationIndex]) {  // Solo avanzar si hay una respuesta seleccionada
        // Guardar la respuesta seleccionada para la ecuación actual
        equationsHistory[currentEquationIndex].respuestaUsuario = selectedAnswers[currentEquationIndex];
        equationsHistory[currentEquationIndex].casillaSeleccionada = selectedAnswers[currentEquationIndex];

        if (currentEquationIndex < maxEquations - 1) {
            currentEquationIndex++;
            updateEquation();
        } else {
            alert("Se ha alcanzado el número máximo de ecuaciones.");
        }
    } else {
        alert("Por favor, selecciona una respuesta para la ecuación actual.");
    }
}

// Cambiar al sistema de ecuaciones anterior
function prevEquation() {
    if (selectedAnswers[currentEquationIndex]) {  // Solo permitir retroceder si hay una respuesta seleccionada
        // Guardar la respuesta seleccionada para la ecuación actual
        equationsHistory[currentEquationIndex].respuestaUsuario = selectedAnswers[currentEquationIndex];
        equationsHistory[currentEquationIndex].casillaSeleccionada = selectedAnswers[currentEquationIndex];

        if (currentEquationIndex > 0) {
            currentEquationIndex--;
            updateEquation();
        }
    } else {
        alert("Por favor, selecciona una respuesta para la ecuación actual.");
    }
}

// Actualizar el texto del sistema de ecuaciones
function updateEquation() {
    const equation = equationsHistory[currentEquationIndex];
    if (equation) {
        document.getElementById("equation").textContent = `Ecuación ${currentEquationIndex + 1}: ${equation.ecuacion}`;
        // Mostrar la respuesta seleccionada para la ecuación actual
        const selectedCell = equation.casillaSeleccionada || "N/A"; // Si no tiene respuesta, poner "N/A"
        document.getElementById("selected-answer").textContent = `Respuesta seleccionada: ${selectedCell}`;
    }
}

// Función para verificar si se ha encontrado el bingo
function checkBingo() {
    console.log("Verificando bingo...");

    // Suponiendo que se usan las ecuaciones actuales directamente
    const currentEquation = ecuaciones[currentEquationIndex];
    const solution = currentEquation.solucion;
    const userAnswer = selectedAnswers.join(", ");

    // Guardar la respuesta del usuario
    currentEquation.respuestaUsuario = userAnswer;

    if (userAnswer === solution) {
        totalPoints += pointsPerCorrectAnswer;
        document.getElementById("points").textContent = totalPoints;
        alert("¡Bingo! Has encontrado la solución correcta.");
    } else {
        attempts--;
        document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;
        
        if (attempts > 0) {
            alert("Respuesta incorrecta. Sigue intentando.");
        } else {
            lockGame();
            setTimeout(showFeedback, 1000);
        }
    }

    // Limpiar respuestas seleccionadas
    selectedAnswers = [];
    const cells = document.querySelectorAll(".cell.selected");
    cells.forEach(cell => cell.classList.remove("selected"));
}


// Mostrar retroalimentación
function showFeedback() {
    const feedbackTable = document.querySelector("#feedback tbody");
    feedbackTable.innerHTML = "";  // Limpiar tabla antes de agregar nuevas filas

    equationsHistory.forEach((equation, index) => {
        const userAnswer = equation.respuestaUsuario || "N/A"; // Mostrar respuesta seleccionada o "N/A" si no se seleccionó nada
        const casillaSeleccionada = equation.casillaSeleccionada || "N/A"; // Mostrar casilla seleccionada

        const row = `
            <tr>
                <td>${equation.ecuacion}</td>
                <td>${equation.solucion}</td>
                <td>${userAnswer}</td>
            </tr>
        `;
        feedbackTable.innerHTML += row;  // Agregar nueva fila a la tabla de retroalimentación
    });

    document.getElementById("feedback-modal").style.display = "block"; // Mostrar el modal de retroalimentación
}

// Cerrar ventana de retroalimentación
function closeFeedback() {
    document.getElementById("feedback-modal").style.display = "none";
}

function feliBingo() {
    const cells = document.querySelectorAll('.cell.selected');
    if (cells.length >= 3) { // Suponiendo que se necesitan al menos 3 casillas seleccionadas
        mostrarFelicitacion();
    } else {
        alert("¡Aún no has completado el Bingo! Sigue intentando.");
    }
}

function mostrarFelicitacion() {
    const modal = document.getElementById("felicitacion-modal");
    modal.style.display = "flex"; // Asegura que el modal sea visible
}

function cerrarFelicitacion() {
    const modal = document.getElementById("felicitacion-modal");
    modal.style.display = "none"; // Oculta el modal
}

 
// Reiniciar el juego
function restartGame() {
    attempts = 1;
    selectedAnswers = [];
    equationsHistory.forEach(equation => equation.respuestaUsuario = '', equation.casillaSeleccionada = '');
    currentEquationIndex = 0;
    totalPoints = 0;

    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("points").textContent = "0";
    document.getElementById("attempts").textContent = "Intentos restantes: 1";
    document.getElementById("feedback-modal").style.display = "none";

    renderBingoBoard();
    startTimer();
    updateEquation();
}
