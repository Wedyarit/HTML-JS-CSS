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
    if (storage === undefined || storage === null || storage.length === 0) return;
    for (let i = 0; i < storage.length; i++)
        tasks.push(new Task(new Date(storage[i].date), storage[i].contents));
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onbeforeunload = closingCode;
function closingCode() {
    removeChecked(calendar.value, calendar.value);
    saveToLocalStorage();
    return null;
}

//-----------------// Tasks //-----------------//
function addTask() {
    let checklist = document.getElementById('checklist');
    let content = document.getElementById('new-task-content').value;
    if (content.length == 0) return;
    document.getElementById('new-task-content').value = '';

    let id = 0;

    if (checklist.lastChild !== null && checklist.lastChild.value !== undefined)
        id = parseInt(checklist.lastChild.value) + 1;
    let task = tasks.filter(task => task.date.toString() == calendar.value.toString())[0];
    if (task != undefined) {
        tasks.splice(tasks.indexOf(task), 1);
        task.contents.push(content);
        tasks.push(task);
    }
    else {
        tasks.push(new Task(calendar.value, [content]));
    }

    addCheck(id, content);
}

function addCheck(i, content) {
    let checklist = document.getElementById('checklist');
    if (checklist.lastChild !== null && checklist.lastChild.innerHTML === 'Похоже, планов нет.')
        while (checklist.lastChild)
            checklist.removeChild(checklist.lastChild);

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
    if (task == undefined)
        addCheck(0, "Похоже, планов нет.");
    else
        for (let i = 0; i < task.contents.length; i++)
            addCheck(i, task.contents[i]);
}

function removeChecked(previousValue) {
    let inputs = Array.prototype.filter.call(document.getElementsByTagName('input'), input => input.type === "checkbox" && input.checked);
    if (inputs.length == 0 || previousValue === undefined) { return; }
    let task = tasks.filter(task => task.date.toString() === previousValue.toString())[0];
    if (task === undefined) { return; }

    tasks.splice(tasks.indexOf(task), 1);
    Array.prototype.forEach.call(inputs, input => task.contents.splice(task.contents.indexOf(task.contents.filter(content => content === input)[0]), 1));
    if (task.contents.length > 0)
        tasks.push(task);
}

//-----------------// Calendar //-----------------//
let calendar;
function initCalendar() {
    calendar = new CalendarPicker("#myCalendarWrapper", {
        min: new Date(),
        max: new Date(new Date().getFullYear() + 1, 0)
    });

    calendar.onValueChange((currentValue) => {
        removeChecked(calendar.previousValue);
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
