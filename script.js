// Dom Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions
function addTodo(event) {
  // Prevent Form From Submitting
  event.preventDefault();

  // Crate Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Todo Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Create Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append To todoList
  todoList.appendChild(todoDiv);

  // Clear To Do Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete To Do
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark To Do
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
