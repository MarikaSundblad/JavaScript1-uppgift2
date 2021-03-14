const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#todos');
const textError = document.querySelector('#textError');

let todos = [];

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data;
      listTodos();
    })
}

fetchTodos();

const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    let template = `
    <div id="${todo.id}" class="row align-item-center justify-content-between m-2">
        <div class="col-9 align-self-start border rounded bg-white p-1">
          <h5 class="todo-text">${todo.title}</h5>
        </div>
        <div class="col align-self-end mt-2">
          <button id="${todo.id}" class="check-btn ${todo.completed && "done"}">
            <i class="far fa-check-circle"></i>
          </button>
          <button id="${todo.id}" class="delete-btn btn trash ${!todo.completed && "d-none"}">
            <i class="fas fa-trash-alt"></i>
          </button>
          </div>
        </div>
        `
    output.insertAdjacentHTML('beforeend', template)
    const buttons = document.querySelectorAll('.check-btn, .delete-btn')
    buttons.forEach(function(button){
      button.addEventListener('click', handleButtons)
    })
  })
}

const createTodo = (title) => {
  if(input.value.trim() !== '') {
    input.classList.remove('is-invalid');
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {

    let newTodo = {
      ...data,
    }
    todos.unshift(newTodo);
    listTodos();
  })
}
else {
      input.classList.add('is-invalid');
}
}

function handleButtons() {
  let e = event.target.parentNode;
  let todoId = e.id;
  if(e.classList.contains('check-btn')) {
    todos.find(todo => todo.id == todoId).completed = true;
  }
  if(e.classList.contains('delete-btn')) {
    todos = todos.filter(todo => todo.id != todoId);
  }
  listTodos();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  createTodo(input.value);
  form.reset();
})