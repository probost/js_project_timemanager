const showRecordsA = document.querySelector('.tabs #records');
const showProjectsA = document.querySelector('.tabs #projects');
const recordsDiv = document.querySelector('.main .records');
const projectsDiv = document.querySelector('.main .projects');

projectsDiv.style.display = 'none'
showProjectsA.style.background= 'darkgray';

showProjectsA.addEventListener('click',()=>{
    recordsDiv.style.display = 'none';
    projectsDiv.style.display = 'block';
    showProjectsA.style.background= '';
    showProjectsA.style.boxShadow= '2px 5px 5px gray';
    showRecordsA.style.background= 'darkgray';
    showRecordsA.style.boxShadow= '';
})
showRecordsA.addEventListener('click',()=>{
    projectsDiv.style.display = 'none';
    recordsDiv.style.display = 'block';
    showRecordsA.style.background= '';
    showRecordsA.style.boxShadow= '2px 5px 5px gray';
    showProjectsA.style.background= 'darkgray';
    showProjectsA.style.boxShadow= '';

})