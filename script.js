const taskInput = document.querySelector('.task');
const startStopBtn = document.querySelector('.startStopBtn')
const timerEl = document.querySelector('.timer')
let savedTime = new Date().setHours(0, 0, 0, 0);
let running = false;
let timerTime;
let startTime;
let dif;
const date = new Date(savedTime);
timerEl.innerText = date.toLocaleTimeString('cs-cz');
startStopBtn.addEventListener("click", () => {
    if (!running) {
        //start timer from 0
        running = true;
        startTime = new Date();
        //start from 0
        savedTime = new Date().setHours(0, 0, 0, 0);
        return;
    }
    if (running) {
        //stop timer
        running = false;
    }
});
let intervalId = setInterval(() => {
    if (running) {
        dif = new Date() - startTime;
        timerTime = savedTime + dif;
        const d = new Date(timerTime);
        timerEl.innerText = d.toLocaleTimeString('cs-cz');
    }
    // if (!running) {
    //     //save time
    //     savedTime = timerTime;
    // }
}, 1);