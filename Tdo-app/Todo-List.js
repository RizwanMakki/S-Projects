let inputValue = document.getElementById("TodoInput");
let submitBtn = document.getElementById("SubmitBtn");
let UlElm = document.getElementById("TodoList");
let ClearAllTodoBtn = document.getElementById("ClearBtn");

let TodoLists = JSON.parse(localStorage.getItem("Todo")) || [];

TodoLists.forEach(Todo => {
    AddTodo(Todo);
});
submitBtn.addEventListener("click", () => {
    let value = inputValue.value.trim();
    if (value === "") {
        alert("Please enter a todo item.");
        return;
    };

    TodoLists.push(value);
    localStorage.setItem("Todo", JSON.stringify(TodoLists));
    AddTodo(value)
})

function AddTodo(Todo) {
    let ListItem = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.textContent = Todo;

    inputValue.value = ""

    console.log(Todo)

    let icons = document.createElement("div");

    let DeleteIcon = document.createElement("ion-icon");
    DeleteIcon.name = "trash-outline";
    DeleteIcon.style.cursor = "pointer";
    icons.appendChild(DeleteIcon);

    DeleteIcon.addEventListener("click", () => {

        ListItem.classList.add("removed");
        setTimeout(() => ListItem.remove(), 500);


        TodoLists = TodoLists.filter(item => item !== Todo);
        localStorage.setItem("Todo", JSON.stringify(TodoLists))

    });
    let EditIcon = document.createElement("ion-icon");
    EditIcon.name = "create-outline";
    EditIcon.style.cursor = "pointer";
    icons.appendChild(EditIcon);

    EditIcon.addEventListener("click", () => {
        let NewValue = prompt("Edit Your  Todo", Todo);

        if (NewValue !== null) {
            textSpan.textContent = NewValue;
        };
        let Index = TodoLists.indexOf(Todo);
        if (Index !== -1) {
            TodoLists[Index] = NewValue;
            localStorage.setItem("Todo", JSON.stringify(TodoLists));
        };

    });

    ListItem.appendChild(textSpan);
    ListItem.appendChild(icons);

    UlElm.appendChild(ListItem);
}
let SearchInput = document.getElementById("SearchInput");
SearchInput.addEventListener("input", FilteredTodo)
function FilteredTodo() {
    let SearchInputValue = SearchInput.value;

    let FilteredTodo = TodoLists.filter(todo => todo.toLowerCase().includes(SearchInputValue.toLowerCase()));

    UlElm.innerHTML = "";

    FilteredTodo.forEach(todo => AddTodo(todo));


};

ClearAllTodoBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all todos?")) {
        TodoLists = [];
        localStorage.removeItem("Todo");
        UlElm.innerHTML = ""; // Remove all list items from UI
    }
});




