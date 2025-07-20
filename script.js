const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerChoicesEelemetns = document.querySelectorAll("#player i");
const computerChoicesEelemetns = document.querySelectorAll("#computer i");

const resetEl = document.querySelector(".reset-icon");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const CHOICES_NUMS = 5;
let playerScore = 0;
let computerScore = 0;
// return a player choice as string "ex. rock" from passed element
function getPlayerChoice(element) {
  // !using title is a bad idea
  return element.title.toLowerCase();
}

// return the computer random choice out of 5 choices
function getComputerChoice() {
  const c = Math.floor(Math.random() * CHOICES_NUMS);
  return Object.keys(choices)[c];
}

// update the player choice on the dom (choice + selected class)
function updatePlayerChoice(playerChoice, element) {
  // update choice element
  playerChoiceEl.textContent = playerChoice
    ? ` --- ${choices[playerChoice].name}`
    : "";

  // remove selected from all elements
  playerChoicesEelemetns.forEach((e) => e.classList.remove("selected"));

  // add selected to the clicked element only
  element?.classList?.add("selected");
}

// update the computer choice on the dom (choice + selected class)
function updateComputerChoice(computerChoice) {
  // update choice element
  computerChoiceEl.textContent = computerChoice
    ? ` --- ${choices[computerChoice].name}`
    : "";

  // remove selected from all elements except selected one
  computerChoicesEelemetns.forEach((e) => {
    e.classList.remove("selected");
    if (e.title === choices[computerChoice]?.name) e.classList.add("selected");
  });
}

// returns win if player wins, lose , tie
function GameResult(playerChoice, computerChoice) {
  if (choices[playerChoice].defeats.includes(computerChoice)) return "win";
  else if (choices[computerChoice].defeats.includes(playerChoice))
    return "lose";
  else return "tie";
}

// sets dom player score
function setPlayerScore(score) {
  playerScoreEl.textContent = score;
}
function setComputerScore(score) {
  computerScoreEl.textContent = score;
}

function updateResultMessage(message) {
  resultText.textContent = message;
}
// update player dom score and start confitti
function playerWins() {
  playerScore++;
  setPlayerScore(playerScore);
  startConfetti();
  updateResultMessage("You Won!");
}

function computerWins() {
  computerScore++;
  setComputerScore(computerScore);
  stopConfetti();
  updateResultMessage("You Lost!");
}

function tie() {
  stopConfetti();
  updateResultMessage("It's a Tie.");
}
// updates the scores according to the winner
function updateGameScore(resultState) {
  if (resultState === "win") {
    playerWins();
  } else if (resultState === "lose") computerWins();
  else tie();
}

function playRound(e) {
  const playerChoice = getPlayerChoice(e.target);
  const computerChoice = getComputerChoice();
  updatePlayerChoice(playerChoice, e.target);
  updateComputerChoice(computerChoice);

  // resultState is (win - tie - lose)
  const resultState = GameResult(playerChoice, computerChoice);
  updateGameScore(resultState);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  // reset data on the dom
  setPlayerScore(0);
  setComputerScore(0);
  resultText.textContent = "Choose Wisly!";

  // remove dom styling
  stopConfetti();
  updatePlayerChoice("", null);
  updateComputerChoice("");
}
// event listeners
playerChoicesEelemetns.forEach((e) => e.addEventListener("click", playRound));

resetEl.addEventListener("click", resetGame);
