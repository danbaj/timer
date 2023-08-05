// Get the elements
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const audioTick = document.getElementById('audioTick');
const audioEnd = document.getElementById('audioEnd');

// Set the initial timer value in seconds (15 minutes in this example)
let timerSeconds = 900;
let interval;

// Format the time as "mm:ss"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secondsRemaining).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

// Update the timer display
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

// Handle the button click
function handleButtonClick() {
  timerSeconds += 60; // Add 1 minute to the timer
  updateTimerDisplay();
}

// Countdown function
function countdown() {
  timerSeconds -= 1;
  updateTimerDisplay();
  audioTick.play();

  if (timerSeconds <= 0) {
    clearInterval(interval);
    audioEnd.play();
    startButton.disabled = false;
  }
}

// Attach the click event to the button
startButton.addEventListener('click', function() {
  startButton.disabled = true;
  interval = setInterval(countdown, 1000);
});

// Initialize the timer display
updateTimerDisplay();
