const startStopBtn = document.querySelector('.startStopBtn');
const timerEl = document.querySelector('.timer');
timerEl.innerText = '0:00:00';
let savedTime = new Date().setHours(0,0,0,0);
let running = false;
let timerTime;
let startTime;
let dif;

startStopBtn.addEventListener("click", () => {
    if (!running) {
        //start timer
        running = true;
        //save start time
        startTime = new Date();
        //save 0
        savedTime = new Date().setHours(0,0,0,0);
        toggleIcon()
        return;
    }
    if (running) {
        //stop timer
        running = false;
        //save timer time
        savedTime = timerTime;
        toggleIcon()
    }
});
let intervalId = setInterval(() => {
    if (running) {
        dif = new Date() - startTime;
        timerTime = savedTime + dif;
        //convert timestamp to date
        const d = new Date(timerTime);
        timerEl.innerText = d.toLocaleTimeString('cs-cz');
    }
}, 1);

function toggleIcon() {
    if (running) {
        startStopBtn.innerText = '⏹';
    } else {
        startStopBtn.innerText = '▶';
    }
}
function getEndTime(){
    return savedTime;
}
function getStartTime(){
    return startTime;
}

