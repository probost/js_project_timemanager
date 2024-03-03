const taskInput = document.querySelector('.task');
const projectSelect = document.querySelector('#project');
let newRecordBtn = document.querySelector('.newRecordBtn');
const recordsTbody = document.querySelector('.recordsTbody');
let records = [];
//load and generate html initially
loadRecordsFromLocal()
generateHtmlRecords()

newRecordBtn.addEventListener('click', () => {
    addRecord()
    saveRecordsToLocal();
    generateHtmlRecords();
})

function addRecord() {
    
    let selectedProject = projectSelect.options[projectSelect.selectedIndex].innerText;
    const record = {
        task: taskInput.innerText,
        project: selectedProject,
        start: getStartTimeString(),
        end: getEndTimeString(),
        total: getDurationString()
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

        taskTd.innerText=r.task;
        projectTd.innerText=r.project;
        startTd.innerText=r.start;
        endTd.innerText=r.end;
        totalTd.innerText=r.total;
        recordTr.appendChild(taskTd);
        recordTr.appendChild(projectTd);
        recordTr.appendChild(startTd);
        recordTr.appendChild(endTd);
        recordTr.appendChild(totalTd);

        recordsTbody.appendChild(recordTr);
    })
}