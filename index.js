let startTime;
let intervalTimer;
let isRunning = false;
let lapCounter = 1;

let isPaused = false;
let pausedStartTime = 0;

function startStopwatch() {
  if (!isRunning) {
    const elapsedMilliseconds = isPaused ? calculateElapsedTime() * 1000 : 0;
    startTime = new Date().getTime() - elapsedMilliseconds;
    isRunning = true;
    updateDisplay();
    intervalTimer = setInterval(updateDisplay, 100);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalTimer);
    isPaused = true;
    pausedStartTime = new Date().getTime();
    document.getElementById('pauseResumeButton').innerText = 'Resume';
  } else if (isPaused) {
    startTime += new Date().getTime() - pausedStartTime;
    startStopwatch();
    isPaused = false;
    document.getElementById('pauseResumeButton').innerText = 'Pause';
  }
}



function resetStopwatch() {
  isRunning = false;
  lapCounter = 1;
  updateDisplay();
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = calculateLapTime();
    const lapList = document.getElementById('lapList');
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCounter++}: ${lapTime}`;
    lapList.insertBefore(lapItem, lapList.firstChild);
  }
}

function updateDisplay() {
  const currentTime = isRunning ? calculateElapsedTime() : 0;
  const formattedTime = formatTime(currentTime);
  document.getElementById('display').innerText = formattedTime;
}

function calculateElapsedTime() {
  const currentTime = new Date().getTime();
  const elapsedMilliseconds = currentTime - startTime;
  return Math.floor(elapsedMilliseconds / 1000);
}

function calculateLapTime() {
  const lapStartTime = startTime;
  const lapEndTime = new Date().getTime();
  const lapTimeMilliseconds = lapEndTime - lapStartTime;
  return formatTime(Math.floor(lapTimeMilliseconds / 1000));
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
