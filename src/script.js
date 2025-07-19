// The Odin Project: Rock Paper Scissors

const WIN_ENTITY = "&#x2B05;&#xFE0F;"; // left-arrow emoji
const LOSS_ENTITY = "&#x27A1;&#xFE0F;"; // right-arrow emoji
const TIE_ENTITY = "&#x1F504;"; // anti-clockwise-arrows emoji
const MAX_ROUND_COUNT = 5;

let humanScore = 0;
let computerScore = 0;
let roundCount = 0;

const gameHeader = document.querySelector(".game-header h2");
const playerOptions = document.querySelector(".human-container .options-container");
const nextRound = document.querySelector(".next-round-container");
nextRound.querySelector("button").addEventListener("click", playRoundRecursive);
const reset = document.querySelector(".reset-container");
reset.querySelector("button").addEventListener("click", resetGame);

resetGame();

function resetGame() {
    const resultBoxes = document.querySelectorAll(".results-container .options-container div");
    resultBoxes.forEach((box) => {
        box.classList.remove("win");
        box.classList.remove("loss");
        box.classList.remove("tie");
        box.textContent = "";
    });

    reset.style.display = "none";

    humanScore = 0;
    computerScore = 0;
    roundCount = 0;

    playRoundRecursive();
}

function playRoundRecursive() {
    resetRound();

    if (roundCount >= MAX_ROUND_COUNT) {
        displayGameResult();
    } else {
        roundCount++;
        awaitPlayerChoice();
    }
}

function resetRound() {
    const selectedOptions = document.querySelectorAll(".selected");
    selectedOptions.forEach((box) => {
        box.classList.remove("selected");
    });

    gameHeader.textContent = "Choose your weapon!";

    nextRound.style.display = "none";
}

function awaitPlayerChoice() {
    playerOptions.addEventListener("click", selectPlayerChoice);
}

function selectPlayerChoice(event) {
    const targetOption = event.target;
    targetOption.classList.add("selected");
    playerOptions.removeEventListener("click", selectPlayerChoice);
    generateComputerChoice();
}

function generateComputerChoice() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            const computerRock = document.querySelector("#computer-rock");
            computerRock.classList.add("selected");
            break;
        case 1:
            const computerPaper = document.querySelector("#computer-paper");
            computerPaper.classList.add("selected");
            break;
        case 2:
            const computerScissors = document.querySelector("#computer-scissors");
            computerScissors.classList.add("selected");
            break;
        default:
            console.log("ERROR: resetting game...");
            resetGame();
            break;
    }
    determineRoundResult();
}

function determineRoundResult() {
    // capitalized string representation of each coice from the choice's id (e.g. player-rock = Rock)
    const playerSelection = capitalize(
        document.querySelector(".human-container .options-container .selected").id.split("-")[1]
    );
    const computerSelection = capitalize(
        document.querySelector(".computer-container .options-container .selected").id.split("-")[1]
    );
    let result;

    switch (playerSelection) {
        case "Rock":
            if (computerSelection === "Rock") {
                result = 0;
            } else if (computerSelection === "Paper") {
                result = -1;
            } else if (computerSelection === "Scissors") {
                result = 1;
            } else {
                result = undefined;
            }
            break;
        case "Paper":
            if (computerSelection === "Rock") {
                result = 1;
            } else if (computerSelection === "Paper") {
                result = 0;
            } else if (computerSelection === "Scissors") {
                result = -1;
            } else {
                result = undefined;
            }
            break;
        case "Scissors":
            if (computerSelection === "Rock") {
                result = -1;
            } else if (computerSelection === "Paper") {
                result = 1;
            } else if (computerSelection === "Scissors") {
                result = 0;
            } else {
                result = undefined;
            }
            break;
        default:
            result = undefined;
    }

    const targetResult = document.querySelector(`#game${roundCount}`);

    switch (result) {
        case 0:
            targetResult.innerHTML = TIE_ENTITY;
            targetResult.classList.add("tie");
            gameHeader.textContent = `Tie! You both chose ${playerSelection}`;
            break;
        case 1:
            targetResult.innerHTML = WIN_ENTITY;
            targetResult.classList.add("win");
            gameHeader.textContent = `Win! ${playerSelection} beats ${computerSelection}`;
            humanScore++;
            break;
        case -1:
            targetResult.innerHTML = LOSS_ENTITY;
            targetResult.classList.add("loss");
            gameHeader.textContent = `Loss! ${computerSelection} beats ${playerSelection}`;
            computerScore++;
            break;
        default:
            console.log("ERROR: resetting game...");
            resetGame();
            break;
    }

    if (roundCount < MAX_ROUND_COUNT) {
        nextRound.style.display = "block";
    } else {
        playRoundRecursive();
    }
}

function displayGameResult() {
    if (humanScore > computerScore) {
        gameHeader.textContent = `You win! ${humanScore}-${computerScore}`;
    } else if (computerScore > humanScore) {
        gameHeader.textContent = `You lose! ${humanScore}-${computerScore}`;
    } else {
        gameHeader.textContent = `It's a tie! ${humanScore}-${computerScore}`;
    }

    reset.style.display = "block";
}

function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
