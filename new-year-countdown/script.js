'use strict';
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
//Set background year
year.innerText = currentYear + 1;


// Time until NewYears
function updateCountDown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime; //in ms
  const d = Math.floor(diff / 1000 / 60 / 60 / 24); //to days
  const h = Math.floor(diff / 1000 / 60 / 60) % 24; //to hours
  const m = Math.floor(diff / 1000 / 60) % 60; //to minutes
  const s = Math.floor(diff / 1000) % 60; // to secs
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${h}` : s;
}
// updateCountDown every sec
setInterval(updateCountDown, 1000);
// Update the DOM
function updateDOM(d, h, m, s) {
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${h}` : s;
}
updateCountDown();
// updateCountDown every sec
setInterval(updateCountDown, 1000);
// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);
