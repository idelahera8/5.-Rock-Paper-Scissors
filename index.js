///////////////////////////////////////////////////////////////////////////////
// ------------------------------ ELEMENTS --------------------------------- //
///////////////////////////////////////////////////////////////////////////////

// Name of each player
const player1NameElement = document.getElementById("player1-name");
const player2NameElement = document.getElementById("player2-name");

// Score of each player
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");

// Image showing the selected option for each player
const player1SelectedImage = document.getElementById("player1-selected-img");
const player2SelectedImage = document.getElementById("player2-selected-img");

// Buttons with the three options for the player
const player1RockButton = document.getElementById("player1-rock-btn");
const player1PaperButton = document.getElementById("player1-paper-btn");
const player1ScissorsButton = document.getElementById("player1-scissors-btn");
const player2RockButton = document.getElementById("player2-rock-btn");
const player2PaperButton = document.getElementById("player2-paper-btn");
const player2ScissorsButton = document.getElementById("player2-scissors-btn");

// Button to start a new game
const newGameButton = document.getElementById("new-game-btn");

// Text element to display who has won the round
const winnerText = document.getElementById("winner-text");

// Text element that shows the text/countdown until reveal of options
const timeText = document.getElementById("time-text");

// The modal
const modal = document.getElementById("modal");

// Accept button in modal
const acceptButton = document.getElementById("accept-btn");

// Radio buttons
const radioButton1 = document.getElementById("radio-btn-1");
const radioButton2 = document.getElementById("radio-btn-2");

// Player Name Inputs
const player1NameInput = document.getElementById("player1-name-input");
const player2NameInput = document.getElementById("player2-name-input");

// Div with player2 option buttons
const player2Buttons = document.getElementById("player2-option-buttons");

///////////////////////////////////////////////////////////////////////////////
// ------------------------------ VARIABLES -------------------------------- //
///////////////////////////////////////////////////////////////////////////////

//
let player1Name = "";
let player2Name = "";

// Score of each player
let player1Score = 0;
let player2Score = 0;

// Selected option
let player1Option = "It's me";
let player2Option = "Hello";

// Options (only used if player 2 is computer)
let options = ["Rock", "Paper", "Scissors"];

// Matrix with image urls
let images = ["Rock.jpg", "Paper.jpg", "Scissors.jpg"];

// Flag defining who has won the round
let player1Win = false;
let player2Win = false;

///////////////////////////////////////////////////////////////////////////////
// --------------------------- EVENT LISTENERS ----------------------------- //
///////////////////////////////////////////////////////////////////////////////

// When pressing new Game Button
newGameButton.addEventListener("click", newGame);

// When pressing any of the buttons, the option gets selected
player1RockButton.addEventListener("click", function () {
  optionSelected("Rock");
});
player1PaperButton.addEventListener("click", function () {
  optionSelected("Paper");
});
player1ScissorsButton.addEventListener("click", function () {
  optionSelected("Scissors");
});

// When pressing any of the buttons, the option gets selected
player2RockButton.addEventListener("click", function () {
  optionSelected("Rock");
});
player2PaperButton.addEventListener("click", function () {
  optionSelected("Paper");
});
player2ScissorsButton.addEventListener("click", function () {
  optionSelected("Scissors");
});

// When pressing the Accept button in the modal
acceptButton.addEventListener("click", acceptModal);

// When pressing the radio buttons
radioButton1.addEventListener("click", function () {
  radioButtons(1);
});
radioButton2.addEventListener("click", function () {
  radioButtons(2);
});

///////////////////////////////////////////////////////////////////////////////
// ------------------------------ FUNCTIONS -------------------------------- //
///////////////////////////////////////////////////////////////////////////////

// ----------------------- GAME START -------------------//

// The function called to start a New Game. Scores are reset and
function newGame() {
  displayModal();
  disableButtons(1);
  disableButtons(2);
}

// -------------------------- MODAL ---------------------------//

// Display the modal
function displayModal() {
  modal.style.display = "block";
  radioButton1.checked = true;
  numberOfPlayers = 1;
  radioButtons(1);
}

// Depending on the number of players, the 2nd player input will be enabled or not
function radioButtons(numberPlayers) {
  numberOfPlayers = numberPlayers;
  if (numberPlayers == 1) {
    player2NameInput.disabled = true;
    player2NameInput.value = "COMPUTER";
  } else {
    player2NameInput.disabled = false;
    player2NameInput.value = "";
  }
}

// Once the accept button is clicked, the names are assigned and the modal is closed
function acceptModal() {
  player1Name = player1NameInput.value;
  player2Name = player2NameInput.value;
  setPlayerNames();
  modal.style.display = "none";
  enableButtons(1);
  resetAll();
  resetWinnerText(player1Name);
  if (numberOfPlayers == 2) {
    displayPlayer2Buttons();
  } else {
    hidePlayer2Buttons();
  }
}

// ------------------------- RESETING VALUES ------------------- //

// Reset everything for a new game
function resetAll() {
  player1Score = 0;
  player2Score = 0;
  player1Option = "";
  player2Option = "";
  resetWinnerText();
  displayScore();
  resetImages();
  resetWinners();
}

// Set the images back to the original state
function resetImages() {
  player1SelectedImage.src = "Question.jpg";
  player2SelectedImage.src = "Question.jpg";
}

// After a winner is selected for the round and a new round is about to begin,
// the winners are reset
function resetWinners() {
  player1Win = false;
  player2Win = false;
  player1Option = "";
  player2Option = "";
}

// Reset the winner text to ask users to choose an option
function resetWinnerText(name) {
  winnerText.innerHTML = name + " SELECT <br> AN OPTION";
}

// ------------------------- SET & DISPLAY VALUES ----------------------- //

// Show the names of both players on top of their option
function setPlayerNames() {
  player1NameElement.textContent = player1Name;
  player2NameElement.textContent = player2Name;
}

// Show both option images
function displaySelectedOptions() {
  player1SelectedImage.src = images[options.indexOf(player1Option)];
  player2SelectedImage.src = images[options.indexOf(player2Option)];
}

// Display the score
function displayScore() {
  player1ScoreElement.textContent = "SCORE: " + player1Score;
  player2ScoreElement.textContent = "SCORE: " + player2Score;
}

// Displays the message of who has won this round
function displayWinnerMessage() {
  if (player1Win == false && player2Win == false) {
    winnerText.innerHTML = "IT'S A TIE. <br> TRY AGAIN!";
  } else if (player1Win == true) {
    winnerText.textContent = player1Name + " WINS!";
  } else {
    winnerText.textContent = player2Name + " WINS!";
  }
}

// Show the option buttons for the player 2 (when 2 players are selected)
function displayPlayer2Buttons() {
  player2Buttons.style.display = "block";
}

// Hide the option buttons for the player 2 (when 1 player is selected)
function hidePlayer2Buttons() {
  player2Buttons.style.display = "none";
}

// ----------------------- OPTIONS ------------------------ //

// Function called when selecting an option.
//  1. Assign option to variable
//  2. Assign random option to player 2
//  3. Display each players option
//  4. Compute who has won
//  5. Display the new score
function optionSelected(option) {
  if (numberOfPlayers == 1) {
    player1Option = option;
    console.log("1 player");
    randomOption();
    disableButtons(1);
    disableButtons(2);
    displaySelectedOptions();
    //  timerText()
    computeWinner();
    displayScore();
    displayWinnerMessage();
    resetWinners();
    setTimeout(resetImages, 1500);
    setTimeout(function () {
      resetWinnerText(player1Name);
    }, 1500);
    setTimeout(function () {
      enableButtons(1);
    }, 1500);
    setTimeout(function () {
      enableButtons(2);
    }, 1500);
  } else {
    if (player1Option == "") {
      player1Option = option;
      disableButtons(1);
      enableButtons(2);
      resetWinnerText(player2Name);
    } else {
      player2Option = option;
      disableButtons(1);
      disableButtons(2);
      displaySelectedOptions();
      //  timerText()
      computeWinner();
      displayScore();
      displayWinnerMessage();
      resetWinners();
      setTimeout(resetImages, 1500);
      setTimeout(function () {
        resetWinnerText(player1Name);
      }, 1500);
      setTimeout(function () {
        enableButtons(1);
      }, 1500);
    }
  }
}

// ------------------------- RANDOM SELECTION ---------------------------- //

// Select a random option of the three for the computer player
function randomOption() {
  let optionNumber = Math.floor(Math.random() * 3);
  player2Option = options[optionNumber];
}

// --------------------------- WINNER COMPUTATION ------------------------- //

// Check who's won in a match between both selected options
function computeWinner() {
  if (player1Option == "Rock") {
    if (player2Option == "Rock") {
      // Tie
    } else if (player2Option == "Paper") {
      player2Score += 1;
      player2Win = true;
    } else if (player2Option == "Scissors") {
      player1Score += 1;
      player1Win = true;
    }
  } else if (player1Option == "Paper") {
    if (player2Option == "Rock") {
      player1Score += 1;
      player1Win = true;
    } else if (player2Option == "Paper") {
      // Tie
    } else if (player2Option == "Scissors") {
      player2Score += 1;
      player2Win = true;
    }
  } else if (player1Option == "Scissors") {
    if (player2Option == "Rock") {
      player2Score += 1;
      player2Win = true;
    } else if (player2Option == "Paper") {
      player1Score += 1;
      player1Win = true;
    } else if (player2Option == "Scissors") {
      // Tie
    }
  }
}

// --------------------- DISABLE / ENABEL BUTTONS -------------------------- //

// disables the buttons
function disableButtons(index) {
  if (index == 1) {
    player1RockButton.disabled = true;
    player1PaperButton.disabled = true;
    player1ScissorsButton.disabled = true;
  } else {
    player2RockButton.disabled = true;
    player2PaperButton.disabled = true;
    player2ScissorsButton.disabled = true;
  }
}

// Enables the buttons
function enableButtons(index) {
  if (index == 1) {
    player1RockButton.disabled = false;
    player1PaperButton.disabled = false;
    player1ScissorsButton.disabled = false;
  } else {
    player2RockButton.disabled = false;
    player2PaperButton.disabled = false;
    player2ScissorsButton.disabled = false;
  }
}

// --------------------------- TIMED FUNCTIONS --------------------- //

// Function that displays a countdown and some text until reveal of choices
function timerText() {
  setTimeout(function () {
    setTimeText("3");
  }, 1000);
  setTimeout(function () {
    setTimeText("2");
  }, 1000);
  setTimeout(function () {
    setTimeText("1");
  }, 1000);
}

function setTimeText(text) {
  timeText.textContent = text;
}
