// OOP
class Task {
    constructor(date, contents) {
        this.date = date;
        this.contents = contents;
    }
}

let tasks = [];


//-----------------// Local Storage //-----------------//
function loadFromLocalStorage() {
    let storage = JSON.parse(localStorage.getItem("tasks"));
    if (storage === undefined || storage.length === 0) return;
    for (let i = 0; i < storage.length; i++)
        tasks.push(new Task(new Date(storage[i].date), storage[i].contents));
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onbeforeunload = closingCode;
function closingCode() {
    saveToLocalStorage();
    return null;
}

//-----------------// Tasks //-----------------//
function addTask() {
    let checklist = document.getElementById('checklist');
    let content = document.getElementById('new-task-content').value;
    let id = 0;

    if (checklist.lastChild !== null && checklist.lastChild.value !== undefined)
        id = parseInt(checklist.lastChild.value) + 1;

    let task = tasks.filter(task => task.date == calendar.date)[0];
    if (task != undefined)
        task.contents.push(content);
    else
        tasks.push(new Task(calendar.date, [content]));

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

function displayTasks(currentValue) {
    let task = tasks.filter(task => task.date.toString() === currentValue.toString())[0];
    let checklist = document.getElementById('checklist');
    while (checklist.lastChild)
        checklist.removeChild(checklist.lastChild);
    if (task == undefined) return;
    for (let i = 0; i < task.contents.length; i++)
        addCheck(i, task.contents[i]);
}

//-----------------// Calendar //-----------------//
let calendar;
function initCalendar() {
    calendar = new CalendarPicker("#myCalendarWrapper", {
        min: new Date(),
        max: new Date(new Date().getFullYear() + 1, 0)
    });

    calendar.onValueChange((currentValue) => {
        displayTasks(currentValue);
    });
}

//-----------------// On Page Load //-----------------//
onload = function () {
    loadFromLocalStorage();
    initCalendar();
    displayTasks(calendar.value);

    clock();
    setInterval(clock, 1000);
}
