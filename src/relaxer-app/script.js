const container = document.getElementById('container');
const text = document.getElementById('text');

// Set Time
const totalTime = 8000; // CSS must match values
const breatheTime = totalTime / 4 + 1000; // 3s per breath = 6s
const holdTime = totalTime / 4; // 2s

const breatheAnimation = function () {
  text.innerText = 'Breath In!';
  container.className = 'container grow';
  setTimeout(() => {
    text.innerText = 'Hold!';
    setTimeout(() => {
      text.innerText = 'Breath Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
};

breatheAnimation();
setInterval(breatheAnimation, totalTime);
