let tasks = [];

class Task {
    constructor(date, contents) {
        this.date = date;
        this.contents = contents;
    }
}

function loadFromLocalStorage() {
    let storage = JSON.parse(localStorage.getItem("tasks"));
    if (storage.length == 0) return;
    for (let i = 0; i < storage.length; i++)
        tasks.push(new Task(new Date(storage[i].date), storage[i].contents));
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let checklist = document.getElementById('checklist');
    let content = document.getElementById('new-task-content').value;
    let id = 0;

    if (checklist.lastChild.value != undefined)
        id = parseInt(checklist.lastChild.value) + 1;

    let task = tasks.filter(task => task.date == myCalender.date)[0];
    if (task != undefined)
        task.contents.push(content);
    else
        tasks.push(new Task(myCalender.date, [content]));

    addCheck(id, content);
}

function addCheck(i, content) {
    let checklist = document.getElementById('checklist');

    let input = document.createElement('input');
    input.id = i;
    input.value = i;
    input.type = 'checkbox';

    let label = document.createElement('label');
    label.htmlFor = i;
    label.innerHTML = content;

    checklist.appendChild(input);
    checklist.appendChild(label);
}

onload = function () {
    loadFromLocalStorage();
}

window.onbeforeunload = closingCode;
function closingCode() {
    saveToLocalStorage();
    return null;
}