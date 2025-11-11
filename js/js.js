let scores = { team1: 0, team2: 0 };

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    const resetButton = document.getElementById("reset");
    const endButton = document.getElementById("endGame");

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
    endButton.addEventListener("click", endGame);
});

function startGame() {
    const team1Input = document.getElementById("team1").value.trim() || "Equipe 1";
    const team2Input = document.getElementById("team2").value.trim() || "Equipe 2";

    document.getElementById("team1Name").textContent = team1Input;
    document.getElementById("team2Name").textContent = team2Input;

    document.getElementById("scoreboard").classList.remove("hidden");
    document.getElementById("historySection").classList.remove("hidden");
    document.getElementById("reset").classList.remove("hidden");
    document.getElementById("endGame").classList.remove("hidden");
}

function changeScore(team, points) {
    scores[team] += points;

    if (scores[team] < 0) scores[team] = 0

    document.getElementById(`${team}Score`).textContent = scores[team];

    const teamName = document.getElementById(`${team}Name`).textContent;
    logHistory(teamName, points, scores[team]);
}

function logHistory(teamName, points, total) {
    const history = document.getElementById("history");
    const li = document.createElement("li");
    const time = new Date().toLocaleTimeString();
    const change = points > 0 ? `+${points}` : points;
    li.textContent = `[${time}] ${teamName} ${change} → Total: ${total}`;
    history.prepend(li);
}

function resetGame() {
    scores = { team1: 0, team2: 0 };
    document.getElementById("team1Score").textContent = "0";
    document.getElementById("team2Score").textContent = "0";
    document.getElementById("history").innerHTML = "";
    document.getElementById("result").textContent = "";
}

function endGame() {
    const team1Name = document.getElementById("team1Name").textContent;
    const team2Name = document.getElementById("team2Name").textContent;
    const resultDiv = document.getElementById("result");

    let resultText = "";

    if (scores.team1 > scores.team2) {
        resultText = `🥇 ${team1Name} venceu por ${scores.team1} a ${scores.team2}!`;
    } else if (scores.team2 > scores.team1) {
        resultText = `🥇 ${team2Name} venceu por ${scores.team2} a ${scores.team1}!`;
    } else {
        resultText = `🤝 Empate! ${scores.team1} a ${scores.team2}`;
    }

    resultDiv.textContent = resultText;
    logHistory("Jogo finalizado,", 0, `Resultado: ${resultText}`);
    document.querySelectorAll(".score-btn").forEach(btn => btn.disabled = true);
}
