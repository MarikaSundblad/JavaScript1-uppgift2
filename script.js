const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#todos');
const textError = document.querySelector('#textError');
// const checkBtn = document.querySelector('.check-btn');

let todos = []

const listTodos = () => {

  output.innerHTML = '';

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
      todos = data;
      output.innerHTML = ''
      todos.forEach(todo => {
        output.innerHTML += `
        <div id="${todo.id}" class="row justify-content-center">
        <div class="col-11 align-self-center border rounded bg-white p-1">
          <h5 class="todo-text">${todo.title}</h5>
        </div>
        <div class="col-1 align-self-center mt-2">
          <button class="check-btn"><i class="far fa-check-circle"></i></button>
        </div>
        </div>`
      })
    })
}

listTodos();

// exempel på att göra post

// const newTodo = {
// 	name: "Leslie Tudor",
// 	email: "leslie.tudor@email.com",
// 	body: "This is an example post by Career Karma!",
// 	postId: 1
// }

// const options = {
// 	method: "POST",
// 	body: JSON.stringify(newTodo),
// 	headers: {
// 		"Content-Type": "application/json"
// 	}
// };

// fetch('https://jsonplaceholder.typicode.com/todos', options)
//   .then(response => response.json())
//   .then(json => console.log(json))

// --------------------------------------

// fetch('https://jsonplaceholder.typicode.com/todos', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

  // slut på exempel
    
    
    form.addEventListener('submit', e => {
      e.preventDefault();
    
      if(input.value.trim() !== '') {
        input.classList.remove('is-invalid');
    
        let todo = {
          id: Date.now().toString(), 
          title: input.value,
          completed: false
        }

        // const options = {
        //     method: "POST",
        //     body: JSON.stringify(todo),
        //     headers: {
        //     	"Content-Type": "application/json"
        //     }
        // }
            
        // fetch('https://jsonplaceholder.typicode.com/todos', options)
        //   .then(response => response.json())
        //   .then(json => console.log(json))
            
        
      
        todos.push(todo);
      
        listTodos();
      
        input.value = ''
      } else {
            input.classList.add('is-invalid');
      }
    })
    
    input.addEventListener('keyup', () => {
      if(input.value.trim() !== '') {
        input.classList.remove('is-invalid');
      } else {
        input.classList.add('is-invalid');
      }
    })
    
    
    output.addEventListener('click', e => {
      if(e.target.classList.contains('btn')) {
        todos = todos.filter(todo => todo.id !== e.target.parentNode.id)
        listTodos();
      }
    
    })

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

                           