//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  addElementToDo(arrayOfTasks);
}

getTasksToLocalStorage();

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterTodo);

//Functions

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array of Tasks
  arrayOfTasks.push(task);
  addElementToDo(arrayOfTasks);
  setTasksToLocalStorage(arrayOfTasks);
}

function addElementToDo(arrayOfTasks) {
  todoList.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.setAttribute("data-id", task.id);

    console.log(arrayOfTasks);
    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = task.title;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class ='fas fa-check'></i>";

    if (task.completed) {
      todoDiv.classList.add("completed");
    }
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append To list
    todoList.appendChild(todoDiv);
  });

  //Clear todo Input value
  todoInput.value = "";
}

function setTasksToLocalStorage(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksToLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    console.log(tasks);
  }
}

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value !== "") {
    addTaskToArray(todoInput.value);
  }
}

function deleteCheck(event) {
  const item = event.target;
  //Delete Item
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });

    deleteFromLocalStorage(item.parentElement.getAttribute("data-id"));
  }

  //Check mark
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    toggleStatusTaskInLocalStorage(item.parentElement.getAttribute("data-id"));
  }
}
function deleteFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  setTasksToLocalStorage(arrayOfTasks);
}
function toggleStatusTaskInLocalStorage(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  setTasksToLocalStorage(arrayOfTasks);
}

// burger-menu

let burgerMenu = document.getElementById("burger-menu");
let container = document.getElementById("container");

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  container.classList.toggle("active");
});

// Theme Color
let theme = localStorage.getItem("theme");
if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName("theme-dot");

for (let i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "light") {
    document.getElementById("theme-style").href = "style/style.css";
  }

  if (mode == "dark") {
    document.getElementById("theme-style").href = "style/dark.css";
  }

  if (mode == "purple") {
    document.getElementById("theme-style").href = "style/purple.css";
  }
  localStorage.setItem("theme", mode);
}
