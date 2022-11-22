'use strict';
const wrongLettersEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'application',
  'programming',
  'interface',
  'wizard',
  'javascript',
  'performance',
];

// @Init
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
displayWord();

function displayWord() {
  const letters = [...selectedWord];
  wordEl.innerHTML = letters
    .map(
      (currLetter) =>
        `<span class="letter">${
          correctLetters.includes(currLetter) ? currLetter : ''
        }</span>`
    )
    .join('');
  checkForWinner();
}

function checkForWinner() {
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You Have Won 😃';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p> Wrong </p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  updateFigure();
  checkForLoser();
}

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

function checkForLoser() {
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately You Lost ☠️';
    popup.style.display = 'flex';
  }
}

// Notification for repeated letters
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown Event
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

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

// Play Again
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  updateFigure();
  popup.style.display = 'none';
});
