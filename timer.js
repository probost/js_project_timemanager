const startStopBtn = document.querySelector('.startStopBtn');
const timerEl = document.querySelector('.timer');
let savedTime = new Date().setHours(0, 0, 0, 0);
let running = false;
let timerTime;
let startTime;
let dif;
let timerInterval;

timerEl.innerText = '0:00:00'

// Check if there's a saved timer state in localStorage
const savedTimerState = localStorage.getItem('timerState');
if (savedTimerState) {
    const { isRunning, start, saved } = JSON.parse(savedTimerState);
    if (isRunning) {
        running = true;
        startTime = new Date(start);
        savedTime = saved;
        startTimer();
    }
}

function updateTimer() {
    if (running) {
        dif = new Date() - startTime;
        timerTime = savedTime + dif;
        const d = new Date(timerTime);
        timerEl.innerText = d.toLocaleTimeString('cs-cz');
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 100);
    running = true;
    toggleIcon();
}

function stopTimer() {
    running = false;
    // savedTime = timerTime || 0;
    clearInterval(timerInterval);
    toggleIcon();
}

function startStopTimer() {
    if (running) {
        stopTimer();
    } else {
        startTime = new Date();
        // Reset the timer when starting
        savedTime = new Date().setHours(0,0,0,0);
        //savedTime = 0; doesn't work
        timerEl.innerText = '0:00:00';
        startTimer();
    }

    // Save the timer state in localStorage
    const timerState = {
        isRunning: running,
        start: startTime,
        saved: savedTime
    };
    localStorage.setItem('timerState', JSON.stringify(timerState));
}

function toggleIcon() {
    startStopBtn.innerText = running ? '⏹' : '▶';
}

startStopBtn.addEventListener('click', startStopTimer);
timerInterval = setInterval(updateTimer, 100);
