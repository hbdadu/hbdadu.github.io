const audioPlayer = document.createElement("audio");
audioPlayer.src = "aankhonCover.mp3";
audioPlayer.preload = "metadata";
let isPlaying = false;

const skipBackwardButton = document.getElementById("skipBackwardButton");
const playPauseButton = document.getElementById("playPauseButton");
const skipForwardButton = document.getElementById("skipForwardButton");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const elapsedTime = document.querySelector(".elapsed-time");
const totalTime = document.querySelector(".total-time");

// Set the date we're counting down to
var countDownDate = new Date("Aug 26, 2024 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("counter").innerHTML = days + " days " + hours + " hours "
  + minutes + " min " + seconds + " sec ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "You're Here!";
  }
}, 1000);

document.getElementById('hideButton').addEventListener('click', function() {
  var announcement = document.getElementById('announce');
  var content = document.getElementById('content');

  if (announcement.style.display !== 'none') {
    announcement.style.display = 'none';
    content.style.display = 'block';
    this.textContent = 'Show Container';
  } else {
    announcement.style.display = 'block';
    content.style.display = 'none';
    this.textContent = 'Hide Container';
  }
});

skipBackwardButton.addEventListener("click", () => {
    audioPlayer.currentTime = 0; // Reset the audio to the beginning
    if (isPlaying) {
        audioPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;"; // Change button text to pause icon
    }
});

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "&#9658;"; // Change button text to play icon
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;"; // Change button text to pause icon
    }
    isPlaying = !isPlaying;
});

skipForwardButton.addEventListener("click", () => {
    audioPlayer.currentTime = audioPlayer.duration; // Set audio to the end
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "&#9658;"; // Change button text to pause icon
    }
});

audioPlayer.addEventListener("timeupdate", () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const elapsedMinutes = Math.floor(audioPlayer.currentTime / 60);
    const elapsedSeconds = Math.floor(audioPlayer.currentTime % 60);
    elapsedTime.textContent = formatTime(elapsedMinutes, elapsedSeconds);

    const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = Math.floor(remainingTime % 60);
    totalTime.textContent = `-${formatTime(remainingMinutes, remainingSeconds)}`;
});

progressBar.addEventListener("click", (event) => {
    const progressBarWidth = progressBar.offsetWidth;
    const clickPosition = event.offsetX;
    const percentClicked = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentClicked / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

function formatTime(minutes, seconds) {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
}
