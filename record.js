const addRecordDialog = document.querySelector("dialog.addRecord");
const form = document.querySelector('form');
const startHoursInput = document.querySelector("#startHours");
const startMinutesInput = document.querySelector("#startMinutes");
const endHoursInput = document.querySelector("#endHours");
const endMinutesInput = document.querySelector("#endMinutes");
const taskInput = document.querySelector('#task');
const projectSelect = document.querySelector('#project');
const newRecordBtn = document.querySelector('.newRecordBtn');
const recordsTbody = document.querySelector('.recordsTbody');
const timeTodaySpan = document.querySelector('.timeToday');
let timeToday = 0;
let records = [];
let counter = 0;
//load and generate html initially
loadRecordsFromLocal()
loadTimeToday()
generateHtmlRecords()
function addRecord() {
    let selectedProject = projectSelect.options[projectSelect.selectedIndex].innerText;
    let startTime = new Date().setHours(startHoursInput.value, startMinutesInput.value, 0, 0);
    let endTime = new Date().setHours(endHoursInput.value, endMinutesInput.value, 0, 0);
    let totalTime = endTime - startTime

    const record = {
        id: counter++,
        task: taskInput.value,
        project: selectedProject,
        start: startTime,
        end: endTime,
        total: totalTime
    }
    records.push(record);
    saveRecordsToLocal();
    console.log(totalTime)
    timeToday += totalTime;
    console.log('adding to timeToday')
    console.log(timeToday)
    saveTimeToday()
}

function deleteRecord(index) {
    if (index >= 0 && index < records.length) {
        console.log(timeToday)
        timeToday -= records[index].total;
        console.log('subtracted total from timeToday')
        console.log(timeToday)
        
        records.splice(index, 1);
        saveRecordsToLocal();
        saveTimeToday()
        generateHtmlRecords()
    }
}

function saveRecordsToLocal() {
    //stringify array of records
    const recordsJson = JSON.stringify(records);
    //save to local storage
    localStorage.setItem('records', recordsJson);
}

function saveTimeToday() {
    localStorage.setItem('timeToday', timeToday.toString());
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
    
    timeToday = parseInt(timeTodayString);
    console.log('loaded timeToday');
    console.log(timeToday);
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
            deleteRecord(records.findIndex(record => record.id === r.id));
            saveTimeToday();
            generateHtmlRecords();
        })

        taskTd.innerText = r.task;
        projectTd.innerText = r.project;
        startTd.innerText = new Date(r.start).toLocaleTimeString('cs-cz');
        endTd.innerText = new Date(r.end).toLocaleTimeString('cs-cz')
        totalTd.innerText = new Date(r.total).toUTCString().split(' ')[4];
        recordTr.appendChild(taskTd);
        recordTr.appendChild(projectTd);
        recordTr.appendChild(startTd);
        recordTr.appendChild(endTd);
        recordTr.appendChild(totalTd);
        recordTr.appendChild(actionTd);
        actionTd.appendChild(deleteBtn);

        recordsTbody.appendChild(recordTr);
        timeTodaySpan.innerText = new Date(timeToday).toUTCString().split(' ')[4];
    })
}



//button shows dialog
newRecordBtn.addEventListener('click', () => {
    addRecordDialog.show();
})

//new record submitted in dialog
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecord();
    saveRecordsToLocal();
    generateHtmlRecords();
    addRecordDialog.close();
})