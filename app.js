const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// saving it to local storage
const todos = JSON.parse(localStorage.getItem('todos'))
if(todos){
  todos.forEach(todo =>{
    addTodo(todo);
  })
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  //build LIs
  if (todoText) {
    const todoEL = document.createElement("li");
    if (todo && todo.completed) {
      todoEL.classList.add("completed");
    }
    todoEL.innerText = todoText;

    //mark as completed
    todoEL.addEventListener("click", () => {
      todoEL.classList.toggle("completed");
      updateLS();
    });

    //delete todo

    todoEL.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEL.remove();
      updateLS();
    });

    //add it to the DOM
    todosUL.appendChild(todoEL);
    input.value = "";
    updateLS();
  }
}

function updateLS(){
  todoEL = document.querySelectorAll('li');
  
  const todos = [];

  todoEL.forEach((todoEL) => {
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
