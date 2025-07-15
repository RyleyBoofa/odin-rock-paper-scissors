/*
Console-based rock-paper-scissors game -- The Odin Project: Project: Rock Paper Scissors
*/

playGame();

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
    let choice = prompt("Type 'Rock', 'Paper', or 'Scissors'", "Rock");
    if (!choice) {
        choice = "rock";
    }    
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
                console.log(`YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`);
                return -1;
            } else if (computerChoice === "scissors") {
                console.log(`YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`);
                return 1;
            }
            break;
        case "paper":
            if (computerChoice === "rock") {
                console.log(`YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`);
                return 1;
            } else if (computerChoice === "paper") {
                console.log(`IT'S A TIE! You both chose ${capitalize(humanChoice)}`);
                return 0;
            } else if (computerChoice === "scissors") {
                console.log(`YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`);
                return -1;
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {
                console.log(`YOU LOSE! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`);
                return -1;
            } else if (computerChoice === "paper") {
                console.log(`YOU WIN! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`);
                return 1;
            } else if (computerChoice === "scissors") {
                console.log(`IT'S A TIE! You both chose ${capitalize(humanChoice)}`);
                return 0;
            }
            break;
        default:
            console.log("Invalid selection(s). No winner.")
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
        console.log(`HUMAN WINS! With a score of ${humanScore}-${computerScore}! GGs, well played!`);
    } else if (computerScore > humanScore) {
        console.log(`COMPUTER WINS! With a score of ${computerScore}-${humanScore}! Better luck next time`);
    } else {
        console.log(`NO WINNER! The scores tied at ${humanScore}-${computerScore}!`);
    }
}

function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}