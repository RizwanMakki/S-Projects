const input = document.getElementById('taskInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

let tasks: string[] = JSON.parse(localStorage.getItem("Todo") || "[]");

tasks.forEach(todo => {

    Addtodo(todo);
});

addBtn.addEventListener('click', () => {
    const task: string = input.value;

    tasks.push(task);
    localStorage.setItem("Todo", JSON.stringify(tasks));
    Addtodo(task);

});
function Addtodo(todo: string) {
    const li = document.createElement('li') as HTMLLIElement;
    li.textContent = todo;

    
    input.value = "";


    const delBtn = document.createElement('button') as HTMLButtonElement;
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


