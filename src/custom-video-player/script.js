const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const playIcon = '<i class="fa fa-play fa-2x"></i>';
const pauseIcon = '<i class="fa fa-pause fa-2x"></i>';

function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

function updatePlayIcon() {
  video.paused ? (play.innerHTML = playIcon) : (play.innerHTML = pauseIcon);
}

// Update progress bar & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  // get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) mins = '0' + String(mins);
  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) secs = '0' + String(secs);
  // update timestamp
  timestamp.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// will play video if paused, or pause if played
video.addEventListener('click', toggleVideoStatus);

// updates icons accordingly
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

// updates the progress bar & timestamp of video
video.addEventListener('timeupdate', updateProgress);

// will play or stop the video
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
