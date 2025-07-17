"use strict";
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem("Todo") || "[]");
tasks.forEach(todo => {
    Addtodo(todo);
});
addBtn.addEventListener('click', () => {
    const task = input.value;
    tasks.push(task);
    localStorage.setItem("Todo", JSON.stringify(tasks));
    Addtodo(task);
});
function Addtodo(todo) {
    const li = document.createElement('li');
    li.textContent = todo;
    input.value = "";
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== todo);
        localStorage.setItem("Todo", JSON.stringify(tasks));
    });
    li.appendChild(delBtn);
    taskList.appendChild(li);
}
