const audioPlayer = document.createElement("audio");
audioPlayer.src = "AankhonSeBatana_Cover.mp3";
audioPlayer.preload = "metadata";
let isPlaying = false;

const skipBackwardButton = document.getElementById("skipBackwardButton");
const playPauseButton = document.getElementById("playPauseButton");
const skipForwardButton = document.getElementById("skipForwardButton");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const elapsedTime = document.querySelector(".elapsed-time");
const totalTime = document.querySelector(".total-time");


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
