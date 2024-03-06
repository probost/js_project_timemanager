const addRecordDialog = document.querySelector("dialog");
const form = document.querySelector('form');
const startHoursInput = document.querySelector("#startHours");
const startMinutesInput = document.querySelector("#startMinutes");
const endHoursInput = document.querySelector("#endHours");
const endMinutesInput = document.querySelector("#endMinutes");
const taskInput = document.querySelector('#task');
const projectSelect = document.querySelector('#project');
let newRecordBtn = document.querySelector('.newRecordBtn');
const recordsTbody = document.querySelector('.recordsTbody');
let records = [];


function addRecord() {
    let selectedProject = projectSelect.options[projectSelect.selectedIndex].innerText;
    let startTime = new Date().setHours(startHoursInput.value, startMinutesInput.value, 0, 0);
    let endTime = new Date().setHours(endHoursInput.value, endMinutesInput.value, 0, 0);
    let totalTime = endTime -startTime;

    let startTimeString = new Date(startTime).toLocaleTimeString('cs-cz')
    let endTimeString = new Date(endTime).toLocaleTimeString('cs-cz')
    let totalTimeString = new Date(totalTime).toLocaleTimeString('cs-cz')

    const record = {
        task: taskInput.value,
        project: selectedProject,
        start: startTimeString,
        end: endTimeString,
        total: totalTimeString
    }
    records.push(record);
    saveRecordsToLocal();
}

function saveRecordsToLocal() {
    //stringify array of records
    const recordsJson = JSON.stringify(records);
    //save to local storage
    localStorage.setItem('records', recordsJson);
}

function loadRecordsFromLocal() {
    //load from local storage
    const recordsJson = localStorage.getItem('records');
    if (recordsJson == null) {
        console.log('local storage null')
        return;
    }
    //parse back into array of records
    records = JSON.parse(recordsJson);
}

function generateHtmlRecords() {
    //remove previously generated html to prevent duplication
    let allTr = document.querySelectorAll(".recordsTbody tr");
    allTr.forEach((tr) => tr.remove());

    records.forEach((r) => {
        const recordTr = document.createElement('tr')
        const taskTd = document.createElement('td')
        const projectTd = document.createElement('td')
        const startTd = document.createElement('td')
        const endTd = document.createElement('td')
        const totalTd = document.createElement('td')

        taskTd.innerText = r.task;
        projectTd.innerText = r.project;
        startTd.innerText = r.start;
        endTd.innerText = r.end;
        totalTd.innerText = r.total;
        recordTr.appendChild(taskTd);
        recordTr.appendChild(projectTd);
        recordTr.appendChild(startTd);
        recordTr.appendChild(endTd);
        recordTr.appendChild(totalTd);

        recordsTbody.appendChild(recordTr);
    })
}

//load and generate html initially
loadRecordsFromLocal()
generateHtmlRecords()

//button shows dialog
newRecordBtn.addEventListener('click', () => {
    addRecordDialog.show();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecord();
    saveRecordsToLocal();
    generateHtmlRecords();
    addRecordDialog.close();
})