const container = document.getElementById('container');
const text = document.getElementById('text');

// SET TIME
const totalTime = 10000; //CSS must match values
const breatheTime = (totalTime / 5) * 2; //4s
const holdTime = totalTime / 5; //2s

/////////////
// FUNCTIONS
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
