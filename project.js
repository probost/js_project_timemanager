const newProjectBtn = document.querySelector('.newProjectBtn');
const projectsTbody = document.querySelector('.projectsTbody');


const addProjectDialog = document.querySelector("#addProjectDialog");
const addProjectForm = document.querySelector('#addProjectForm');
const addProjectInput = document.querySelector('#addProjectInput');

const editProjectDialog = document.querySelector("#editProjectDialog");
const editProjectForm = document.querySelector('#editProjectForm');
const editProjectInput = document.querySelector('#editProjectInput');

let projects = [];
let projectCounter = 0;

loadProjects();
renderProjects();
renderOptions();

function addProject() {
    const project = {
        id: projectCounter++,
        project_name: addProjectInput.value,
        total: 0,
    }
    projects.push(project);
    saveProjects();
    addProjectOption(project.id);
    
    renderOptions();
    renderProjects();
}

function editProject(id){
        
        //array index can be different to id, find index
        const index = projects.findIndex(project => project.id === id);

        if (index !== -1) {
            //edit the project attributes
            projects[index].project_name = editProjectInput.value;
        }
        saveProjects();
        addProjectOption(projects[index].id);
        
        renderOptions();
        renderProjects();
}


function deleteProject(id) {
    if (confirm("Delete project?"))
    {
        const index = projects.findIndex(project => project.id === id);
        if (index !== -1) {
            projects.splice(index, 1);
            
            saveProjects();
            deleteProjectOption(id);
            
            renderOptions();
            renderProjects();
        }
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

     // Update projectCounter to avoid duplicate IDs
     if (projects.length > 0) {
        projectCounter = Math.max(...projects.map(p => p.id)) + 1;
    }
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
        editBtn.innerText = 'edit';

        deleteBtn.innerText = 'delete';
        deleteBtn.addEventListener('click', () => {
            deleteProject(project.id);
            renderProjects();
        })


        editBtn.addEventListener('click', () => {
            
            
            editProjectInput.value = project.project_name;
            editProjectForm.dataset.projectId = project.id; //store id in dataset of form
            editProjectDialog.show();
        })
        

        projectTd.innerText = project.project_name;
        totalTd.innerText = formatTimestamp(project.total);
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
    addProjectInput.value = '';
})
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProject();
    addProjectDialog.close();
})

editProjectForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const id = parseInt(editProjectForm.dataset.projectId);
    editProject(id);
    editProjectDialog.close();
})


function renderOptions(){
    //remove all options in both select elements
    while (projectTimerSelect.firstChild) {
        projectTimerSelect.removeChild(projectTimerSelect.firstChild);
    }
    while (projectSelect.firstChild) {
        projectSelect.removeChild(projectSelect.firstChild);

    } for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        addProjectOption(project.id);
    }
}


function addProjectOption(id) {
    let lastIndex = projects.findIndex(project => project.id === id);
    let lastProject = projects[lastIndex];
    let newOptionTimer = document.createElement('option');
    let newOptionDialog = document.createElement('option');
    newOptionTimer.innerText = lastProject.project_name;
    newOptionDialog.innerText = lastProject.project_name;
    projectTimerSelect.appendChild(newOptionTimer);
    projectSelect.appendChild(newOptionDialog);
}

function deleteProjectOption(id) {
    let index = projects.findIndex(project => project.id === id);
    if (projects[index] === undefined) {
        return;
    }
    let optionElements = Array.from(projectTimerSelect.children);;
    for (const option of optionElements) {
        if (option.innerText === projects[index].project_name) {
            option.remove();
        }
    }

}
function updateProject(projectName, totalTaskTime) {
    const index = projects.findIndex(project => project.project_name === projectName);
    if (projects[index] === undefined) {
        return;
    }
    projects[index].total += totalTaskTime;

    saveProjects();
    renderProjects();
}