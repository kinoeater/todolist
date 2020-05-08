//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const deleteAllButton = document.querySelector(".delete-all");

eventListen();

// Event Listeners
function eventListen() {
  document.addEventListener('DOMContentLoaded',getTodos);
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("click", fiterTodo);
  deleteAllButton.addEventListener("click",deleteAll)
}

//Functions

function addTodo(e) {
  const toDoEntry = todoInput.value.trim();

  if (toDoEntry === "") {
    alert("Giriş alanını doldurun");
  } else {

    const newToDoitem = todoInput.value.trim();
    // add to UI
    addToUI(newToDoitem);

    // add to local storage
    saveLocalTodos(newToDoitem); 
  }

  //prevent Form from Submitting, so we can see the action
  e.preventDefault();
}

function addToUI(newToDoitem) {
  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li new todo
  const newtodo = document.createElement("li");
  newtodo.innerText = newToDoitem;
  newtodo.classList.add("todo-item");
  todoDiv.appendChild(newtodo);

  // create chekmark button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeButton);

  // create trash  button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  // add all elements to parent ul
  todoList.appendChild(todoDiv);
// cler text input area
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    todo.classList.add("fall");

    todo.addEventListener("transitionend", () => {
    todo.remove();
    removeLocalTodos(todo);
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function fiterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((element) => {
    switch (e.target.value) {
      case "all":
        console.log("all showed");
        element.style.display = "flex";
        break;
      case "completed":
        console.log("completed showed");
        if (element.classList.contains("completed")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
      case "uncompleted":
        console.log("uncompleted showed");
        if (!element.classList.contains("completed")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;

      default:
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check if there i already sth at localstorage
  let todos;

  // check if the local storage is empty
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } 
  
  // if not empty then get the item which are list of strings,
  // the parse them into a JSON array file
  else  { 
    todos = JSON.parse(localStorage.getItem('todos'));
  } 

  // add the new item to the todos array
  todos.push(todo);
  // stringify the JSON array back  then add it to the local storage
  localStorage.setItem('todos',JSON.stringify(todos));
}

function removeLocalTodos(todo) {

  let todos;

  // check if the local storage is empty
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } 
  
  // if not empty then get the item which are list of strings,
  // the parse them into a JSON array file
  else  { 
    todos = JSON.parse(localStorage.getItem("todos"));
  } 

 // console.log(todo);
  const todoEntry=todo.children[0].innerText;
  todos.splice(todos.indexOf(todoEntry),1);
  localStorage.setItem('todos',JSON.stringify(todos));

}

function getTodos() {

//Check if there i already sth at localstorage
let todos;

// check if the local storage is empty
if(localStorage.getItem('todos') === null) {
  todos = [];
} 
// if not empty then get the item which are list of strings,
// the parse them into a JSON array file
else  { 
  todos = JSON.parse(localStorage.getItem('todos'));
} 
todos.forEach(element => {
  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li new todo
  const newtodo = document.createElement("li");
  newtodo.innerText = element;
  newtodo.classList.add("todo-item");
  todoDiv.appendChild(newtodo);

  // create chekmark button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeButton);

  // create trash  button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  // add all elements to parent ul
  todoList.appendChild(todoDiv);

});
} 

function deleteAll(e) {
  const todos = todoList.children;
  
  if(todoList.children.length != 0 ) {

    console.log(todoList.children.length);

    if(confirm("Tümünü silmek istediğinizden emin misiniz?")) {
      //console.log(todos);
      //delete all tasks
      while(todoList.firstElementChild != null ) {
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos");
     
    }

  }

  
}