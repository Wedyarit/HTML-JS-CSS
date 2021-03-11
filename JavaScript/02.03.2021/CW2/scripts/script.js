//-----------------//  Object Oriented Programming //-----------------//
class Task {
    constructor(date, contents) {
        this.date = date;
        this.contents = contents;
    }
}

//-----------------//  LS Data //-----------------//
let tasks = [];
let username = "";

function newUser() {
    document.getElementById('task-plan').style.display = "none";
    document.getElementById('statistics').style.display = "none";
}

function existingUser() {
    greeting();
    document.getElementById('join').onclick = function () { window.scrollTo({ top: 1800, behavior: 'smooth' }); }
}

function continue_() {
    username = document.getElementById('inputName').value;
    if (username.length == 0)
        return;
    greeting();
    document.getElementById('task-plan').style.display = "flex";
    document.getElementById('statistics').style.display = "flex";
    window.scrollTo({ top: 1800, behavior: 'smooth' });
}

function greeting() {
    document.getElementById('greeting-message').innerHTML = `Приветствую, ${username}!`;
    document.getElementById('continue').onclick = function () { window.scrollTo({ top: 1800, behavior: 'smooth' }); }
    document.getElementsByClassName('form-group')[0].style.display = "none";
}

//-----------------// Local Storage //-----------------//
function loadFromLocalStorage() {
    username = localStorage.getItem('name');
    if (username === null) {
        newUser();
        return;
    }
    else
        existingUser();

    let storage = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < storage.length; i++)
        tasks.push(new Task(new Date(storage[i].date), storage[i].contents));
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (username.length > 0)
        localStorage.setItem("name", username);
}

window.onbeforeunload = function closingCode() {
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

    if (!isNaN(checklist.lastChild.htmlFor))
        id = parseInt(checklist.lastChild.htmlFor) + 1;
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
    updateCharts();
}

function addCheck(i, content) {
    let checklist = document.getElementById('checklist');
    if (checklist.lastChild !== null && checklist.lastChild.innerHTML === 'Похоже, планов нет')
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
        addCheck(0, "Похоже, планов нет");
    else
        for (let i = 0; i < task.contents.length; i++)
            addCheck(i, task.contents[i]);

    initCharts();
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

let chart;
function updateCharts() {
    let data = [];
    let labels = [];

    tasks.forEach(task => { data.push(task.contents.length); labels.push(task.date) });
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

function initCharts() {
    var ctx = document.getElementById('chart').getContext('2d');
    let data = [];
    let labels = [];

    tasks.forEach(task => { data.push(task.contents.length); labels.push(`${harold(task.date.getDay())}.${harold(task.date.getMonth())}.${task.date.getFullYear()}`) });
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Количество планов в день',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//-----------------// On Page Load //-----------------//
onload = function () {
    loadFromLocalStorage();
    initCalendar();
    initCharts();
    displayTasks(calendar.value);

    clock();
    setInterval(clock, 1000);
}
