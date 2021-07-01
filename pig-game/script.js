'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const bttnNew = document.querySelector('.btn--new');
const bttnRoll = document.querySelector('.btn--roll');
const bttnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0'); //player 0 currentScore
const current1El = document.getElementById('current--1'); //player 1 currentScore
const total0El = document.getElementById('score--0'); //player 0 totalScore
const total1El = document.getElementById('score--1'); //player 1 totalScore

//Game Variables
let currentScore, scores, activePlayer, playing;

//Initialize New Game
const init = function () {
  currentScore = 0;
  //finalScores array, index[0] = player 0, etc.
  scores = [0, 0];
  activePlayer = 0; //Player 0 starts
  playing = true; //Active game condition
  score0El.textContent = 0; //Total score displays
  score1El.textContent = 0;
  current0El.textContent = 0; //Current score displays
  current1El.textContent = 0;
  diceEl.classList.add('hidden'); //Hide the dice
  player0El.classList.add('player--active'); //Highlight player0 display
};

init();

//Switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll button functionality
bttnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold button functionality
bttnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false; //set playing to false
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden'); //hide the dice again
    } else {
      switchPlayer();
    }
  }
});

//New Game button functionality
bttnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner'); //remove winner display
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active'); //remove activePlayer display
  init(); //newGame
});
