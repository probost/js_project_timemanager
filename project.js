
const addProjectDialog = document.querySelector("dialog.addProject");
const projectForm = document.querySelector('.addProject form');
const projectInput = document.querySelector('#projectInput');
const newProjectBtn = document.querySelector('.newProjectBtn');
const projectsTbody = document.querySelector('.projectsTbody');
let projects = [];
let projectCounter = 0;

loadProjects();
renderProjects();
renderOptions();

function addProject() {
    const project = {
        id: projectCounter++,
        project: projectInput.value,
        total: 0,
    }
    projects.push(project);
    addProjectOption(project.id);
    saveProjects();
    renderProjects();
}


function deleteProject(id) {
    const indexToDelete = projects.findIndex(project => project.id === id);
    if (indexToDelete !== -1) {
        projects.splice(indexToDelete, 1);
        deleteProjectOption(indexToDelete);
        saveProjects();
        renderProjects();
    }
}

function saveProjects() {
    //stringify array of projects
    const projectsJson = JSON.stringify(projects);
    //save to local storage
    localStorage.setItem('projects', projectsJson);
}

function loadProjects() {
    //load from local storage
    const projectsJson = localStorage.getItem('projects');
    if (projectsJson == null) {
        return;
    }
    //parse back into array of projects
    projects = JSON.parse(projectsJson);
}
function renderProjects() {
    //remove previously generated html to prevent duplication
    let allTr = document.querySelectorAll(".projectsTbody tr");
    allTr.forEach(tr => tr.remove());

    projects.forEach(project => {
        const projectTr = document.createElement('tr');

        const projectTd = document.createElement('td');
        const totalTd = document.createElement('td');
        const actionTd = document.createElement('td');

        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        deleteBtn.innerText = 'smazat';
        deleteBtn.addEventListener('click', () => {
            deleteProject(project.id);
            renderProjects();
        })

        editBtn.innerText = 'upravit';
        editBtn.addEventListener('click', () => {
            projectInput.innerText = project.project;

            deleteProject(project.id);
            addProjectDialog.show();
            renderProjects();

        })

        projectTd.innerText = project.project;
        totalTd.innerText = formatDate(new Date(project.total));
        projectTr.appendChild(projectTd);
        projectTr.appendChild(totalTd);
        projectTr.appendChild(actionTd);

        actionTd.appendChild(deleteBtn);
        actionTd.appendChild(editBtn);

        projectsTbody.appendChild(projectTr);
    })

}



//button shows dialog
newProjectBtn.addEventListener('click', () => {
    addProjectDialog.show();
})

//new record submitted in dialog
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProject();
    saveProjects();
    renderProjects();
    projectInput.innerText = '';
    addProjectDialog.close();
})
function renderOptions(){
    for (let i = 0; i < projects.length; i++){
        let project = projects[i];
        addProjectOption(project.id);
    }
}
function addProjectOption(id){
let lastIndex = projects.findIndex(project=>project.id === id);
let lastProject = projects[lastIndex];
let newOptionTimer = document.createElement('option');
let newOptionDialog = document.createElement('option');
newOptionTimer.innerText = lastProject.project;
newOptionDialog.innerText = lastProject.project;
projectTimerSelect.appendChild(newOptionTimer);
projectSelect.appendChild(newOptionDialog);
}
function deleteProjectOption(id){
    let index = projects.findIndex(project=>project.id === id);
    if (projects[index]===undefined){
        return;
    }
    let optionElements = projectTimerSelect.children;
    for (const option of optionElements) {
        if (option.innerHTML === projects[index].project) {
            option.remove();
        }
    }
    
}
function updateProject(projectName, totalTime){
    const index = projects.findIndex(project => project.project === projectName);
    if (projects[index]===undefined){
        return;
    }
    projects[index].total += totalTime;

    saveProjects();
    renderProjects();
}