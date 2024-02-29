const startStopBtn = document.querySelector('.startStopBtn');
const timerEl = document.querySelector('.timer');
timerEl.innerText = '0:00:00';
let savedTime = new Date().setHours(0,0,0,0);
let running = false;
let timerTime;
let startTime = new Date().setHours(0,0,0,0);
let endTime = new Date().setHours(0,0,0,0);
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
        //save end time
        endTime = new Date();
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
function getDuration(){
    if (running){
        return new Date(timerTime - startTime).toLocaleTimeString('cs-cz');
    }
   return new Date(savedTime).toLocaleTimeString('cs-cz');
}
function getStartTime(){
    return new Date(startTime).toLocaleTimeString('cs-cz');
}
function getEndTime(){
    if (running) {
        return  new Date(timerTime).toLocaleTimeString('cs-cz')
    } else{
    return new Date(endTime).toLocaleTimeString('cs-cz');
    }
}

