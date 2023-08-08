// Get the elements
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const audioTick = document.getElementById('audioTick');
const audioEnd = document.getElementById('audioEnd');

let timerSeconds = 0;
let interval;
let timerRunning;
let resetClick = 0;

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


// Countdown function
function countdown() {
  timerSeconds -= 1;
  updateTimerDisplay();
  audioTick.play();

  if (timerSeconds <= 0) {
    clearInterval(interval);
    audioEnd.play();
    timerRunning = 0;
  }
}

// Attach the click event to the button
startButton.addEventListener('click', function() {
    if(resetClick){ //If this click is the one that resets the timer after a hold it should not add time or start the timer
        resetClick = 0;
    }
    else{
        timerSeconds += 61;
        if(!timerRunning){
            interval = setInterval(countdown, 1000);
            timerRunning = 1;
        }
    }
});

// Initialize the timer display
updateTimerDisplay();

//Timer reset by holding button for 5 seconds

class ClickAndHold {
    /**
     * 
     * @param {EventTarget} target The HTML element to apply the event to 
     * @param {Function} callback The function to run when the target is clicked and held 
     */
    constructor(target, callback){
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimoutId = null;

        ["mousedown", "touchstart"].forEach(type => {
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel" ].forEach(type => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart(){
        this.isHeld = true;

        this.activeHoldTimoutId = setTimeout(() => {
            if (this.isHeld){
                this.callback();        
            }
        }, 5000);
    }

    
    _onHoldEnd(){
        this.isHeld = false;
        clearTimeout(this.activeHoldTimoutId);
    }
}

new ClickAndHold(startButton, () => {
    timerSeconds = 1;
     resetClick = 1;
     //timerRunning = 0;
   
})

//Hint menu
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}