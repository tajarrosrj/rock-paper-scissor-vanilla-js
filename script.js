const updateScoreElement = () => {
  document.querySelector(".js-score").innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
};

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

const moves = ["rock", "paper", "scissors"];

moves.forEach(move => {
  document.querySelector(`.js-${move}-button`).addEventListener("click", () => playGame(move));
});

const playGame = (playerMove) => {
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  let result = "";
  if (playerMove === computerMove) {
    result = "It's a tie!"
    score.ties++;
  } else if ((playerMove === "rock" && computerMove === "scissors") || (playerMove === "paper" && computerMove === "rock") || (playerMove === "scissors" && computerMove === "paper")) {
    result = "You win!"
    score.wins++;
  } else {
    result = "You lose!"
    score.losses++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You <img src="images/${playerMove}-icon.png" class="icon-move" /> vs <img src="images/${computerMove}-icon.png" class="icon-move" /> Computer`
};

const resetScore = () => {
  score = {wins: 0, losses: 0, ties: 0};
  localStorage.removeItem("score");
  updateScoreElement();
}

document.querySelector(".reset-button").addEventListener("click", () => resetScore());