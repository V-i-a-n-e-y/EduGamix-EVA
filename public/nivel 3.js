let timer = 180; // Tiempo en segundos
function startTimer() {
    setInterval(function() {
        if (timer > 0) {
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;
            document.getElementById('timer').innerHTML = `TIEMPO: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timer--;
        }
    }, 1000);
}

let points = 0;
function updatePoints(value) {
    points += value;
    document.getElementById('points').innerHTML = `Puntos obtenidos: ${points}/1000`;
}

function nextLevel() {
    alert('Has avanzado al siguiente nivel.');
    updatePoints(100);
}
