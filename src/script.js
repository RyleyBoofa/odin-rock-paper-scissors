/*
Console-based rock-paper-scissors game -- The Odin Project: Project: Rock Paper Scissors
*/

// playGame();

const WINNER_ENTITY = "&#x2B05;&#xFE0F;"; // left-arrow emoji
const LOSER_ENTITY = "&#x27A1;&#xFE0F;"; // right-arrow emoji
const TIE_ENTITY = "&#x1F504;"; // anti-clockwise-arrows emoji

let humanScore = 0;
let computerScore = 0;
let roundCount = 0;

resetGame();

function resetGame() {
    const resultBoxes = document.querySelectorAll(".results-container .options-container div");
    Array.from(resultBoxes).forEach((box) => {
        box.classList.remove("winner");
        box.classList.remove("loser");
        box.classList.remove("tie");
        box.textContent = "";
    });

    const selectedOptions = document.querySelectorAll(".selected");
    Array.from(selectedOptions).forEach((box) => {
        box.classList.remove("selected");
    });

    const gameHeader = document.querySelector(".game-header h2");
    gameHeader.textContent = "Choose your weapon!";

    const resetButton = document.querySelector(".reset-container");
    resetButton.style.display = "none";

    humanScore = 0;
    computerScore = 0;
    roundCount = 0;

    playRoundRecursive();
}

function playRoundRecursive() {
    if (roundCount >= 5) {
        // game over, determine winner
    } else {
        roundCount++;
        awaitPlayerChoice();
    }
}

function awaitPlayerChoice() {
    const playerOptions = document.querySelector(".human-container .options-container");
    playerOptions.addEventListener("click", (e) => {
        const targetOption = e.target;
        targetOption.classList.add("selected");
        generateComputerChoice();
    });
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
    const playerSelection = document
        .querySelector(".human-container .options-container .selected")
        .id.split("-")[1];
    const computerSelection = document
        .querySelector(".computer-container .options-container .selected")
        .id.split("-")[1];
    let result;

    switch (playerSelection) {
        case "rock":
            if (computerSelection === "rock") {
                result = 0;
            } else if (computerSelection === "paper") {
                result = -1;
            } else if (computerSelection === "scissors") {
                result = 1;
            } else {
                result = undefined;
            }
            break;
        case "paper":
            if (computerSelection === "rock") {
                result = 1;
            } else if (computerSelection === "paper") {
                result = 0;
            } else if (computerSelection === "scissors") {
                result = -1;
            } else {
                result = undefined;
            }
            break;
        case "scissors":
            if (computerSelection === "rock") {
                result = -1;
            } else if (computerSelection === "paper") {
                result = 1;
            } else if (computerSelection === "scissors") {
                result = 0;
            } else {
                result = undefined;
            }
            break;
        default:
            result = undefined;
    }

    switch (result) {
        case 0:
            // tie
            break;
        case 1:
            // player wins
            break;
        case -1:
            // computer wins
            break;
        default:
            console.log("ERROR: resetting game...");
            resetGame();
            break;
    }

    // playRoundRecursive();
}

function getComputerChoice() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function getHumanChoice() {
    let choice = prompt("Type 'Rock', 'Paper', or 'Scissors'", "Rock") || "rock";
    switch (choice.toLowerCase()) {
        case "rock":
            return "rock";
        case "paper":
            return "paper";
        case "scissors":
            return "scissors";
        default:
            return "rock";
    }
}

function playRound(humanChoice, computerChoice) {
    switch (humanChoice) {
        case "rock":
            if (computerChoice === "rock") {
                console.log(`IT'S A TIE! You both chose ${capitalize(humanChoice)}`);
                return 0;
            } else if (computerChoice === "paper") {
                console.log(
                    `YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
                );
                return -1;
            } else if (computerChoice === "scissors") {
                console.log(
                    `YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
                );
                return 1;
            }
            break;
        case "paper":
            if (computerChoice === "rock") {
                console.log(
                    `YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
                );
                return 1;
            } else if (computerChoice === "paper") {
                console.log(`IT'S A TIE! You both chose ${capitalize(humanChoice)}`);
                return 0;
            } else if (computerChoice === "scissors") {
                console.log(
                    `YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
                );
                return -1;
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {
                console.log(
                    `YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
                );
                return -1;
            } else if (computerChoice === "paper") {
                console.log(
                    `YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
                );
                return 1;
            } else if (computerChoice === "scissors") {
                console.log(`IT'S A TIE! You both chose ${capitalize(humanChoice)}`);
                return 0;
            }
            break;
        default:
            console.log("Invalid selection(s). No winner.");
            return 0;
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let result = playRound(getHumanChoice(), getComputerChoice());
        if (result < 0) {
            computerScore++;
        } else if (result > 0) {
            humanScore++;
        }
    }

    if (humanScore > computerScore) {
        console.log(
            `HUMAN WINS! With a score of ${humanScore}-${computerScore}! GGs, well played!`
        );
    } else if (computerScore > humanScore) {
        console.log(
            `COMPUTER WINS! With a score of ${computerScore}-${humanScore}! Better luck next time`
        );
    } else {
        console.log(`NO WINNER! The scores tied at ${humanScore}-${computerScore}!`);
    }
}

function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
