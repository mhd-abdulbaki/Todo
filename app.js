//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click',filterTodo)

//Functions
function addTodo(event) {
  event.preventDefault();

  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class ='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append To list
  todoList.appendChild(todoDiv);

  //Clear todo Input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  //Delete Item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Filter Todo

function filterTodo(e) {
    const todos =todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display='flex';
                break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }else{
                    todo.style.display ='none';
                }
                break;
            
                
        }
    })
}
