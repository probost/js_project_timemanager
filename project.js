const showRecordsA = document.querySelector('.tabs #records');
const showProjectsA = document.querySelector('.tabs #projects');
const recordsDiv = document.querySelector('.main .records');
const projectsDiv = document.querySelector('.main .projects');

const addProjectDialog = document.querySelector("dialog.addProject");
const projectForm = document.querySelector('.addProject form');
const taskProjectInput = document.querySelector('#projectInput');
const newProjectBtn = document.querySelector('.newProjectBtn');
const projectsTbody = document.querySelector('.projectsTbody');
projectsDiv.style.display = 'none'

showProjectsA.addEventListener('click',()=>{
   recordsDiv.style.display = 'none'
   projectsDiv.style.display = 'block'
})
showRecordsA.addEventListener('click',()=>{
    projectsDiv.style.display = 'none'
    recordsDiv.style.display = 'block'
})

