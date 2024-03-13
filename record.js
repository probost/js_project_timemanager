const addRecordDialog = document.querySelector("dialog.addRecord");
const recordForm = document.querySelector('.addRecord form');
const startHoursInput = document.querySelector("#startHours");
const startMinutesInput = document.querySelector("#startMinutes");
const endHoursInput = document.querySelector("#endHours");
const endMinutesInput = document.querySelector("#endMinutes");
const taskInput = document.querySelector('#task');
const projectSelect = document.querySelector('#project');
const projectTimerSelect = document.querySelector('#projectTimer');
const taskInputTimer = document.querySelector('.taskTimer');
const newRecordBtn = document.querySelector('.newRecordBtn');
const recordsTbody = document.querySelector('.recordsTbody');
let timeTodaySpan = document.querySelector('.timeToday');
let timeToday = 0;
let records = [];
let recordCounter = 0;

//load and generate html initially
loadRecordsFromLocal()
timeTodaySpan.innerText = '0:00:00'
loadTimeToday()
generateHtmlRecords()
function addRecordManual() {
    let selectedProject = projectSelect.options[projectSelect.selectedIndex];
    let startTime = new Date().setHours(startHoursInput.value, startMinutesInput.value, 0, 0);
    let endTime = new Date().setHours(endHoursInput.value, endMinutesInput.value, 0, 0);
    let totalTime =  new Date(endTime -startTime)
    //fix incorrect timezone
    if (totalTime >= 3600000)
    {
        totalTime -= 3600000;
    }
    const record = {
        id: recordCounter++,
        task: taskInput.value,
        project: selectedProject.innerText,
        start: startTime,
        end: endTime,
        total: totalTime
    }
    records.push(record);
    saveRecordsToLocal();
    timeToday += totalTime;
    console.log(`adding to timeToday ${timeToday}`)
    saveTimeToday()
    
    projectTimerSelect.value = projectSelect.value;
}
function addRecordTimer() {
    let selectedProject = projectTimerSelect.options[projectTimerSelect.selectedIndex];

    const record = {
        id: recordCounter++,
        task: taskInputTimer.value,
        project: selectedProject.innerText,
        start: getStartTime(),
        end: getEndTime(),
        total: getTotalTime()
    }
    records.push(record);
    saveRecordsToLocal();
    timeToday += record.total;

    saveTimeToday()
    generateHtmlRecords();

}

function deleteRecord(id) {
    const indexToDelete = records.findIndex(record => record.id === id);
    if (indexToDelete !== -1) {
        timeToday -= records[indexToDelete].total;
        console.log(`subtracting from timeToday${timeToday}`)

        const deletedRecord = records.splice(indexToDelete, 1)[0];
        saveRecordsToLocal();
        saveTimeToday();
        generateHtmlRecords();
    }
    
}

function saveRecordsToLocal() {
    //stringify array of records
    const recordsJson = JSON.stringify(records);
    //save to local storage
    localStorage.setItem('records', recordsJson);
}

function saveTimeToday() {
    localStorage.setItem('timeToday', timeToday);
}

function loadRecordsFromLocal() {
    //load from local storage
    const recordsJson = localStorage.getItem('records');
    if (recordsJson == null) {
        return;
    }
    //parse back into array of records
    records = JSON.parse(recordsJson);
}

function loadTimeToday() {
    let timeTodayString = localStorage.getItem('timeToday');
    if (timeTodayString == null) {
        return;
    }
    
    timeToday = timeTodayString;
    console.log(`loading timeToday from localStorage ${timeToday}`)
}

function generateHtmlRecords() {
    //remove previously generated html to prevent duplication
    let allTr = document.querySelectorAll(".recordsTbody tr");
    allTr.forEach((tr) => tr.remove());

    records.forEach((r) => {
        const recordTr = document.createElement('tr');
        const taskTd = document.createElement('td');
        const projectTd = document.createElement('td');
        const startTd = document.createElement('td');
        const endTd = document.createElement('td');
        const totalTd = document.createElement('td');
        const actionTd = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'smazat';
        deleteBtn.addEventListener('click', () => {
            deleteRecord(r.id);
            generateHtmlRecords();
        })

        taskTd.innerText = r.task;
        projectTd.innerText = r.project;
        startTd.innerText = formatDate(new Date(r.start));
        endTd.innerText = formatDate(new Date(r.end));
        totalTd.innerText = formatTime(new Date(r.total));
        recordTr.appendChild(taskTd);
        recordTr.appendChild(projectTd);
        recordTr.appendChild(startTd);
        recordTr.appendChild(endTd);
        recordTr.appendChild(totalTd);
        recordTr.appendChild(actionTd);
        actionTd.appendChild(deleteBtn);

        recordsTbody.appendChild(recordTr);
        //update timeToday
    })
    timeTodaySpan.innerText = formatTime(new Date(timeToday));
}



//button shows dialog
newRecordBtn.addEventListener('click', () => {
    addRecordDialog.show();
})

//new record submitted in dialog
recordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecordManual();
    saveRecordsToLocal();
    generateHtmlRecords();
    addRecordDialog.close();
})

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are indexed from 0 for some reason
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}.${month}.${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds()
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds :seconds}`;
}

function clearTaskInputTimer(){
    taskInputTimer.value = '';
}
