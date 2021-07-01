//Note: The HTML5 video element includes a variety of properties and methods
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const playIcon = '<i class="fa fa-play fa-2x"></i>';
const pauseIcon = '<i class="fa fa-pause fa-2x"></i>';

// Play & pause video
function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

// Update play/pause icon
function updatePlayIcon() {
  video.paused ? (play.innerHTML = playIcon) : (play.innerHTML = pauseIcon);
}

// Update the progress bar & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  //Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) mins = '0' + String(mins);
  //Get Seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) secs = '0' + String(secs);
  //Update timestamp
  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//Event Listeners
video.addEventListener('click', toggleVideoStatus);
//^ will play the video if paused, or pause if played
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
//^ updates the icons accordingly
video.addEventListener('timeupdate', updateProgress);
//^ updates the progress bar & timestamp of the video

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
//^ will play the video if paused, or pause if played
progress.addEventListener('change', setVideoProgress);
//^ updates the progress of the video
