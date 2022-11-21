'use strict';

// The Secret Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Turns/Score
let score = 20;
// Highest Score
let highScore = 0;

// Updates a message on the game to the user
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// If user enters a guess
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // If no number entered
  if (!guess) {
    displayMessage('🚫 No Number!');
    score--;
    document.querySelector('.score').textContent = score;

    // When player wins
  } else if (guess === secretNumber && score > 1) {
    displayMessage('🥳 Correct Number!');
    //...change styles
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    //...change display number
    document.querySelector('.number').textContent = secretNumber;
    //...update high score
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber && score > 1) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    document.querySelector('.score').textContent = score;

    // Out of guesses
  } else {
    displayMessage('🧯 You lost the game!');
  }
});

// Reset the game, the 'Again!' button
document.querySelector('.again').addEventListener('click', function () {
  // reset values
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  //...reset styles
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
