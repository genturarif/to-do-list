// DOM Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Create Todo Object
function TodoObject(task, isCompleted) {
  this.task = task;
  this.isCompleted = isCompleted;
}

// Global Variabel
let todoTask;
let todoObjectArray = [];

// Add To Do List
function addTodo(event) {
  event.preventDefault();

  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");

  todoTask = todoInput.value; // Set value let todoTask to todoInputValue
  const taskUndefined = new TodoObject(todoTask, false); // Set parameter function TodoObject to const taskUndefined

  todoObjectArray.push(taskUndefined); // Push const taskUndefined to Array let todoObjectArray

  newTodo.innerText = todoInput.value; // Write input value to display
  todoDiv.appendChild(newTodo);

  // Add To Do To Local Storage
  saveLocalTodos(taskUndefined); // Set Parameter function saveLocalTodos to const taskUndefined

  // Create Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'> </i> ";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'> </i> ";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append To List
  todoList.appendChild(todoDiv);

  // Clear Todo Input value
  todoInput.value = "";
}

// Delete, Check, and Update To Local Storage
function deleteCheck(e) {
  const item = e.target;

  // Delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    todo.classList.add("fall");

    todo.addEventListener("transitionend", function () {
      todo.remove();

      let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));
      todoObjectArray = previousTodos; // Set value array let todoObjectArray to let previousTodos

      todoObjectArray.forEach(function (todoObject) {
        const index = todoObjectArray.indexOf(todoObject);

        if (todoObject.task === item.parentNode.firstChild.innerText) {
          todoObjectArray.splice(index, 1);
          localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));
        }
      });
    });
  }

  // Check Mark
  else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed"); // Add class completed if user click complete-btn

    let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));
    todoObjectArray = previousTodos; // Set value array let todoObjectArray to let previousTodos

    let checkToDoCompleted = todo.classList.contains("completed"); // Set value let checkToDoCompleted
    const todoIndex = item.parentNode.firstChild.innerText;

    todoObjectArray.forEach(function (arrayItem) {
      if (checkToDoCompleted === true && todoIndex === arrayItem.task) {
        arrayItem.isCompleted = true;
      } else if (checkToDoCompleted === false && todoIndex === arrayItem.task) {
        arrayItem.isCompleted = false;
      }
    });

    localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));
  }
}

// Filter Todo All, Completed, and Uncompleted
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Local Storage
function saveLocalTodos(todo) {
  let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray"));

  if (previousTodos === null) {
    previousTodos = [];
  }

  previousTodos.push(todo);
  localStorage.setItem("todoObjectsArray", JSON.stringify(previousTodos));
}

function getTodos() {
  let localData = JSON.parse(localStorage.getItem("todoObjectsArray")); // Create let localData and set value

  if (localData === null) {
    localData = "";
  } else {
    localData.forEach(function (todoObject) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // Create Li
      const newTodo = document.createElement("li");
      newTodo.innerText = todoObject.task;

      // Completed task still in display if user refresh page
      if (todoObject.isCompleted === true) {
        todoDiv.classList.add("completed");
      }

      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      // Create Mark Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = "<i class='fas fa-check'> </i> ";
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // Create Trash Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = "<i class='fas fa-trash'> </i> ";
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      // Append To List
      todoList.appendChild(todoDiv);
    });
  }
}
