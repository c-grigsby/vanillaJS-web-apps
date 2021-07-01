'use strict';

const wrongLettersEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const figureParts = document.querySelectorAll('.figure-part');

// Come back to add a backend DB to this
const words = [
  'application',
  'programming',
  'interface',
  'wizard',
  'javascript',
];

// Initialize Game
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];
displayWord();

// Show hidden word & checks for winner
function displayWord() {
  const letters = [...selectedWord];
  wordEl.innerHTML = letters
    .map(
      currLetter =>
        `<span class="letter">${
          correctLetters.includes(currLetter) ? currLetter : ''
        }</span>`
    ) //map
    .join(''); //turn the arr into a string

  checkForWinner();
}

// Check for winner
function checkForWinner() {
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You Have Won 😃';
    popup.style.display = 'flex';
  }
}

// Updates the result of wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p> Wrong </p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  updateFigure();
  checkForLoser();
}

// Update figure
function updateFigure() {
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
}

// Check for loser
function checkForLoser() {
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately You Lost ☠️';
    popup.style.display = 'flex';
  }
}

// Show notification for repeated letters
function showNotification() {
  console.log('show notification');
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000); //auto remove in 2 sec
}

// Event: Keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    console.log(letter);

    if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else if (
      !selectedWord.includes(letter) &&
      !wrongLetters.includes(letter)
    ) {
      wrongLetters.push(letter);
      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});

// Event: Restart Game and Play Again
playAgainBtn.addEventListener('click', () => {
  // Empty Arrs
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  displayWord();
  updateWrongLettersEl();
  updateFigure();
  popup.style.display = 'none';
});
