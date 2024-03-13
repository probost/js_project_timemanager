
const addProjectDialog = document.querySelector("dialog.addProject");
const projectForm = document.querySelector('.addProject form');
const projectInput = document.querySelector('#projectInput');
const newProjectBtn = document.querySelector('.newProjectBtn');
const projectsTbody = document.querySelector('.projectsTbody');
let projects = [];
let projectCounter = 0;

//loadProjectsFromLocal();
//generateHtmlProjects()

function addProject() {
    const project = {
        id: projectCounter++,
        project: projectInput.value,
        total: 0,
    }
    projects.push(project);
    saveProjectsToLocal();
    generateHtmlProjects()
}
function deleteProject(id) {
    const indexToDelete = projects.findIndex(project => project.id === id);
    if (indexToDelete !== -1) {
        const deletedProject = projects.splice(indexToDelete, 1)[0];
        saveProjectsToLocal();
        generateHtmlProjects();
    }
}

function saveProjectsToLocal() {
    //stringify array of projects
    const projectsJson = JSON.stringify(records);
    //save to local storage
    localStorage.setItem('projects', projectsJson);
}
function loadProjectsFromLocal() {
    //load from local storage
    const projectsJson = localStorage.getItem('projects');
    if (projectsJson == null) {
        return;
    }
    //parse back into array of projects
    records = JSON.parse(projectsJson);
}
function generateHtmlProjects() {
    //remove previously generated html to prevent duplication
    let allTr = document.querySelectorAll(".projectsTbody tr");
    allTr.forEach((tr) => tr.remove());

    projects.forEach((project) => {
        const projectTr = document.createElement('tr');

        const projectTd = document.createElement('td');
        const totalTd = document.createElement('td');
        const actionTd = document.createElement('td');

        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        deleteBtn.innerText = 'smazat';
        deleteBtn.addEventListener('click', () => {
            deleteProject(project.id);
            generateHtmlProjects();
        })

        editBtn.innerText = 'upravit';
        editBtn.addEventListener('click', () => {
            projectInput.innerText = project.project;

            deleteProject(project.id);
            addProjectDialog.show();
            generateHtmlProjects();
        })

        projectTd.innerText = project.project;
        totalTd.innerText = formatDate(new Date(project.total));
        projectTr.appendChild(projectTd);
        projectTr.appendChild(totalTd);
        projectTr.appendChild(actionTd);

        actionTd.appendChild(deleteBtn);
        actionTd.appendChild(editBtn);

        projectsTbody.appendChild(projectTr);
        //timeTodaySpan.innerText = new Date(timeToday).toTimeString().split(' ')[0]
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
    saveProjectsToLocal();
    generateHtmlProjects();
    addProjectDialog.close();
})