'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const bttnNew = document.querySelector('.btn--new');
const bttnRoll = document.querySelector('.btn--roll');
const bttnHold = document.querySelector('.btn--hold');
// player0 & player1 currentScores
const current0El = document.getElementById('current--0'); 
const current1El = document.getElementById('current--1'); 
// player0 & player1 totalScores
const total0El = document.getElementById('score--0');
const total1El = document.getElementById('score--1'); 

let currentScore, scores, activePlayer, playing;

// @Init New Game
const init = function () {
  currentScore = 0;
  // finalScores array, index[0] = player 0, etc
  scores = [0, 0];
  activePlayer = 0; 
  playing = true; 
  // total scores
  score0El.textContent = 0; 
  score1El.textContent = 0;
  // current scores
  current0El.textContent = 0; 
  current1El.textContent = 0;
  
  diceEl.classList.add('hidden'); 
  player0El.classList.add('player--active'); 
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

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

bttnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false; 
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden'); 
    } else {
      switchPlayer();
    }
  }
});

// New Game Click
bttnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner'); 
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active'); 
  init(); 
});
