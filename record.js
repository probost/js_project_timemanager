const addRecordDialog = document.querySelector("dialog#recordDialog");
const recordForm = document.querySelector('form#recordForm');


const startDateTimeInput = document.querySelector("input#startDateTimeInput");
const endDateTimeInput = document.querySelector("input#endDateTimeInput");

const dateInput = document.querySelector('input#date')
taskInput = document.querySelector('input#task');
const projectSelect = document.querySelector('select#project');
const projectTimerSelect = document.querySelector('select#projectTimer');
const taskInputTimer = document.querySelector('input.taskTimer');
const newRecordBtn = document.querySelector('button.newRecordBtn');
const recordCancelBtn = document.querySelector('#recordCancelBtn');
const recordsTbody = document.querySelector('tbody.recordsTbody');
let timeTodaySpan = document.querySelector('span.timeToday');
let timeToday = 0;
let records = [];
let idCounter = 0;

//load and generate html initially
loadRecords()
loadTimeToday()
renderRecords()

function addRecord(taskName, projectName, start, end) {

    const record = {
        id: idCounter++,
        task_name: taskName,
        project_name: projectName,
        start: start,
        end: end,
        total:  end > start ? (end - start) : 0
    }
    

    records.push(record)
    saveRecords();

    updateProject(record.project, record.total);
    renderRecords();

    addToTimeToday(record.total);
    saveTimeToday();
}

function deleteRecord(id) {
    if (confirm("Delete record?")){
        const indexToDelete = records.findIndex(record => record.id === id);
    if (indexToDelete !== -1) {
        addToTimeToday(-records[indexToDelete].total)
        saveTimeToday();

        updateProject(records[indexToDelete].project, records[indexToDelete].total * (-1))

        records.splice(indexToDelete, 1);
        saveRecords();
        renderRecords();
    }
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

    let timeTodayString = localStorage.getItem('timeToday');
    if (timeTodayString) {
        timeToday = parseInt(timeTodayString);
    }else{
    timeTodaySpan.innerText = '0:00:00'
    }
}

function addToTimeToday(n){
    if (timeToday += n >= 0) timeToday += n;
    renderTimeToday();
}
function renderTimeToday(){
    timeTodaySpan.innerText = formatTimestamp(timeToday);
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

        taskTd.innerText = r.task_name;
        projectTd.innerText = r.project_name;
        startTd.innerText = formatDate(new Date(r.start));
        endTd.innerText = formatDate(new Date(r.end));
        totalTd.innerText = formatTimestamp(new Date(r.total));
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
    renderTimeToday();
}



newRecordBtn.addEventListener('click', () => {
    addRecordDialog.show();
})

recordCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addRecordDialog.close();
})

recordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecord(taskInput.value, projectSelect.options[projectSelect.selectedIndex].innerText, startDateTimeInput.valueAsNumber, endDateTimeInput.valueAsNumber)
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
