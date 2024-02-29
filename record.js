const taskInput = document.querySelector('.task');
const projectSelect = document.querySelector('.project');
const newTaskBtn = document.querySelector('.newTaskBtn');

let records = [];

newTaskBtn.addEventListener('click',()=>{

})
function addRecord(){
    let selectedProject = projectSelect.options[projectSelect.selectedIndex].innerText;
    const record = {
        task: taskInput.innerText,
        project: selectedProject,
        start:getStartTime(),
        end:getEndTime(),
        total:getDuration()
    }
    records.push(record);
}