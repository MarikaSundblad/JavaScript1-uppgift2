const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#todos');
const textError = document.querySelector('#textError');
// const checkBtn = document.querySelector('.check-btn');

// test 2
let todos = [];

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
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
    <div id="${todo.id}" class="row justify-content-center">
        <div class="col-11 align-self-center border rounded bg-white p-1">
          <h5 class="todo-text">${todo.title}</h5>
        </div>
        <div class="col-1 align-self-center mt-2">
          <button class="check-btn"><i class="far fa-check-circle"></i></button>
        </div>
        </div>`
    output.insertAdjacentHTML('beforeend', template)
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

form.addEventListener('submit', e => {
  e.preventDefault();

  createTodo(input.value);
  form.reset();
})
    
    
    // output.addEventListener('click', e => {
    //   if(e.target.classList.contains('btn')) {
    //     todos = todos.filter(todo => todo.id !== e.target.parentNode.id)
    //     listTodos();
    //   }
    
    // })



const checkBtn = document.querySelector('.check-btn');

// checkBtn.addEventListener("click", function() {
//   this.children[0].style.color = "#66c144";
// //   this.getElementsByTagName('i').classList.toggle('green-btn');
// })

// const checkBox = () => { 
//       if(document.querySelector('todos.completed') === true) {
//             checkBtn.style.color = 'green';
//       }
//       else(document.querySelector('todos.completed') === false) {
//             checkBtn.style.color = 'grey';
//       }
// }

                           