'use strict';
const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.querySelector('main');

const dataArr = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];


// Init speech synth
const message = new SpeechSynthesisUtterance();

// Set text message to speak
const setTextMessage = function (text) {
  message.text = text;
};

// Speak text
const speakText = function () {
  speechSynthesis.speak(message);
};

// Create speech boxes
const createBox = function (obj) {
  const box = document.createElement('div');
  const { image, text } = obj;
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  main.appendChild(box);
  // image click
  box.addEventListener('click', () => {
    setTextMessage(text); 
    speakText(); 
    box.classList.add('active'); 
    setTimeout(() => box.classList.remove('active'), 800);
  });
};

// Store voices
let voices = [];
const getVoices = function () {
  if (typeof speechSynthesis === 'undefined') return;
  voices = speechSynthesis.getVoices();
  console.log(voices);
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name}  (${voice.lang})`;
    voicesSelect.appendChild(option);
  });
};

// Change Voice
const setVoice = function (e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
};

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);
// Toggle text box
toggleBtn.addEventListener('click', () => textBox.classList.toggle('show'));
// Close bttn
closeBtn.addEventListener('click', () => textBox.classList.remove('show'));
// Select new voice
voicesSelect.addEventListener('change', setVoice);
// Read text bttn
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

// @Init
function init() {
  getVoices();
  dataArr.forEach(createBox);
}
init();
