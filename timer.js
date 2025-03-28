const startStopBtn = document.querySelector('.startStopBtn');
const timerEl = document.querySelector('.timer');
let savedTime = new Date().setHours(0, 0, 0, 0);
let isRunning = false;
let timerTime;
let startTime;
let dif;
let timerInterval;
let endTime;


checkSavedTimer();

// Check if there's a saved timer state in localStorage
function checkSavedTimer(){
    timerEl.innerText = '0:00:00'

    const savedTimerState = localStorage.getItem('timerState');
    if (savedTimerState) {
        const { is_running, start_time, saved_time } = JSON.parse(savedTimerState);
        if (is_running) {
            isRunning = true;
            startTime = new Date(start_time);
            savedTime = saved_time;
            startTimer();
        }
    }
}


function updateTimer() {
    if (isRunning) {
        dif = new Date() - startTime;
        timerTime = savedTime + dif;
        const d = new Date(timerTime);
        timerEl.innerText = d.toLocaleTimeString('cs-cz');
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 100);
    isRunning = true;
    toggleIcon();
}

function stopTimer() {
    isRunning = false;
    endTime = new Date();
    clearInterval(timerInterval);
    toggleIcon();
    addRecord(taskInputTimer.value, projectTimerSelect.options[projectTimerSelect.selectedIndex], getStartTime(),getEndTime(),getTotalTime() )
    clearTaskInputTimer();
    timerEl.innerText = '0:00:00'
}

function startStopTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        startTime = new Date();
        // Reset the timer when starting
        savedTime = new Date().setHours(0, 0, 0, 0);
        //savedTime = 0; doesn't work
        timerEl.innerText = '0:00:00';
        startTimer();
    }

    // Save the timer state in localStorage
    saveTimerState(isRunning, startTime, savedTime);
}

function saveTimerState(isRunning, startTime, savedTime) {
    const timerState = {
        is_running: isRunning,
        start_time: startTime,
        saved_time: savedTime
    };
    localStorage.setItem('timerState', JSON.stringify(timerState));
}

function toggleIcon() {
    startStopBtn.innerText = isRunning ? '⏹' : '▶';
}
function getStartTime() {
    return startTime.getTime();
}
function getEndTime() {
    return endTime.getTime();
}
function getTotalTime() {
    return new Date(timerTime).getTime();
}

startStopBtn.addEventListener('click', startStopTimer);
timerInterval = setInterval(updateTimer, 100);
