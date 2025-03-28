const addRecordDialog = document.querySelector("dialog.addRecord");
const recordForm = document.querySelector('.addRecord form');
const startHoursInput = document.querySelector("#startHours");
const startMinutesInput = document.querySelector("#startMinutes");
const endHoursInput = document.querySelector("#endHours");
const endMinutesInput = document.querySelector("#endMinutes");
const dateInput = document.querySelector('#date')
taskInput = document.querySelector('#task');
const projectSelect = document.querySelector('#project');
const projectTimerSelect = document.querySelector('#projectTimer');
const taskInputTimer = document.querySelector('.taskTimer');
const newRecordBtn = document.querySelector('.newRecordBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const recordsTbody = document.querySelector('.recordsTbody');
let timeTodaySpan = document.querySelector('.timeToday');
let timeToday = 0;
let records = [];
let recordCounter = 0;

startTime = new Date(dateInput.valueAsDate).setHours(startHoursInput.value, startMinutesInput.value, 0, 0);
endTime = new Date(dateInput.valueAsDate).setHours(endHoursInput.value, endMinutesInput.value, 0, 0);
//load and generate html initially
loadRecords()
loadTimeToday()
renderRecords()

function addRecord(task, project, start, end, total) {

    const record = {
        id: recordCounter++,
        task: task.value,
        project: project.innerText,
        start: start,
        end: end,
        total: total
    }
    timeToday += record.total;
    saveTimeToday()

    records.push(record)
    saveRecords();

    updateProject(record.project, record.total);
    renderRecords();
}

function deleteRecord(id) {
    const indexToDelete = records.findIndex(record => record.id === id);
    if (indexToDelete !== -1) {
        timeToday -= records[indexToDelete].total;

        updateProject(records[indexToDelete].project, records[indexToDelete].total * (-1))

        records.splice(indexToDelete, 1);
        saveRecords();
        saveTimeToday();
        renderRecords();
    }

}

function saveRecords() {
    //stringify array of records
    const recordsJson = JSON.stringify(records);
    //save to local storage
    localStorage.setItem('records', recordsJson);
}



function loadRecords() {
    const recordsJson = localStorage.getItem('records');
    if (recordsJson == null) {
        return;
    }
    records = JSON.parse(recordsJson);
}
function saveTimeToday() {
    let timeTodayJson = JSON.stringify(timeToday);
    localStorage.setItem('timeToday', timeTodayJson);
}
function loadTimeToday() {
    timeTodaySpan.innerText = '0:00:00'

    let timeTodayString = localStorage.getItem('timeToday');
    if (timeTodayString) {
        timeToday = parseInt(timeTodayString);
    }
}

function renderRecords() {
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
        deleteBtn.innerText = 'delete';
        deleteBtn.addEventListener('click', () => {
            deleteRecord(r.id);
            renderRecords();
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
    timeTodaySpan.innerText = formatTime(timeToday);
}



newRecordBtn.addEventListener('click', () => {
    addRecordDialog.show();
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addRecordDialog.close();
})

recordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecord(taskInput, projectSelect.options[projectSelect.selectedIndex], new Date(dateInput.valueAsDate).setHours(startHoursInput.value, startMinutesInput.value, 0, 0), new Date(dateInput.valueAsDate).setHours(endHoursInput.value, endMinutesInput.value, 0, 0), endTime - startTime)
    saveRecords();
    renderRecords();
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
function formatTime(ms) {
    const date = new Date(ms); // Create a Date object from mseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format minutes and seconds with leading zeros if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Combine all components into the desired time format
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}


function clearTaskInputTimer() {
    taskInputTimer.value = '';
}
