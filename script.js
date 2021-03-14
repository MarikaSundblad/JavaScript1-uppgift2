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
          <button id="doneTodo" class="check-btn ${todo.completed && "done"}">
            <i class="far fa-check-circle"></i>
          </button>
          <button id="removeTodo" class="delete-btn btn d-none ${todo.completed && "trash"}">
            <i class="fas fa-trash-alt"></i>
          </button>
          </div>
        </div>
        `
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


// test

// const removeTodo = document.querySelector('.removeTodo');

// removeTodo.addEventListener('click', function() {
//   if(todo.completed) {
//     deleteItem(todo.id);
//   }  
//   else { 
//     errorCheck.innerText = 'You can\'t delete an item without first marking it as done!'
//     errorCheck.classList.remove('d-none');
//   }
// })



// const doneTodo = document.querySelector('.doneTodo');

// checkButton.addEventListener('click', () => {
//   checkToggle(todo.id)
// })

// const deleteItem = (id) => {
//   let index = todos.findIndex(x => x.id === id);
//   todos.splice(index,1);
//   listTodos();
// }

// const checkToggle = (id) => {
//   let index = todos.findIndex(x => x.id === id);
//   todos[index].completed = !todos[index].completed;
//   listTodos();
// }


// test

// const doneTodo = document.querySelector('.doneTodo');

// function checkBox(doneTodo) {
//   doneTodo.addEventListener('click', e => {
//     if (todos.completed === true) {
//       element.classList.add("done");
//     }
//     else {
//       element.classList.add("undone");
//     }
//   })
// }

// test

// const doneButton = document.createElement('button');
//     doneButton.innerHTML = '<i class="fas fa-check"></i>';
//     doneButton.classList.add('complete-btn');
//     todoDiv.appendChild(completedButton);

//     //Check Trash button
//     const trashButton = document.createElement('button');
//     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//     trashButton.classList.add('trash-btn');
//     todoDiv.appendChild(trashButton);


//  work in progress

// let todoId = 10;
// let todos = []

// fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
//     .then((response) => response.json())
//     .then((data) => listTodos(data))

// const listTodos = (data) => {

//   todos = data;
//   let todoIndex = 0;

//   output.innerHTML = ''

//   todos.forEach(todo => {
//     output.innerHTML += `
//     <div id="${todo.id}" class="row align-item-center justify-content-between m-2">
//         <div class="col-9 align-self-start border rounded bg-white p-1">
//           <h5 class="todo-text">${todo.title}</h5>
//         </div>
//         <div class="col align-self-end mt-2">
//           <button id="doneTodo" class="check-btn btn btn-success"><i class="far fa-check-circle"></i></button>
//           <button id="removeTodo" class="delete-btn btn d-none"><i class="fas fa-trash-alt"></i></button>
//           </div>
//         </div>
//     `
//     if(todo.completed){

//       output.children[todoIndex].childNodes[3].childNodes[1].classList.add('done')
//       output.children[todoIndex].childNodes[3].childNodes[1].classList.remove('btn-success')
//       output.children[todoIndex].childNodes[3].childNodes[3].classList.add('trash')
//       output.children[todoIndex].childNodes[3].childNodes[3].classList.remove('d-none')
//     }
//     todoIndex += 1;
//   });
// }

//   output.addEventListener('click', (e) => {
//     if (e.target.classList.contains('trash')) {
//       let id = e.target.parentNode.parentNode.id;
//       let newTodos = todos.filter((todo) => {return todo.id != id})
//       listTodos(newTodos);
//     }
//   })

//   output.addEventListener('click', (e) => {
//     if (e.target.classList.contains('btn-success')){
//       let id = e.target.parentNode.parentNode.id;
//       let todoIndex = todos.findIndex(todo => todo.id == id)
//       todos[todoIndex].completed = true;
//       listTodos(todos);
//     }
//     else if(e.target.classList.contains('trash')){
//       let id = e.target.parentNode.parentNode.id;
//       let todoIndex = todos.findIndex(todo => todo.id == id)
//       listTodos(todos);
//     }
//   })

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     if(validateTodo(form.newTodo.value) && validateTodoUniqe(form.newTodo.value)) {
//       form.newTodo.classList.remove('is-invalid')
//       todoId += 1;
//       fetch('https://jsonplaceholder.typicode.com/todos', {
//       method: 'POST',
//       body: JSON.stringify({
//         userId: 1,
//         id: 201,
//         title: form.newTodo.value,
//         completed: false
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       })
//       .then((response) => response.json())
//       .then((data) => (todos.splice(0, 0, changeId(data))))
//       .then(() => listTodos(todos))
//       form.newTodo.value = '';
//     } 
//     else {
//       form.newTodo.classList.add('is-invalid')
//       form.newTodo.nextSibling.nextSibling.innerHTML = 'Your todo needs to be atleast 2 characters long.';
//     }
//   })

//   const changeId = (value) => {
//     value.id = todoId
//     return value
//   }

//   const validateTodo = (value) => {
//     if(value.length >= 2) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   }

// const newTodo = (todo) => {
//   if(todo.completed === true){
//     todosOutput.innerHTML +=
//     `
//     <div id="${todo.id}" class="row justify-content-center">
//         <div class="col-11 align-self-center border rounded bg-white p-1">
//           <h5 class="todo-text">${todo.title}</h5>
//         </div>
//         <div class="col-1 align-self-center mt-2">
//           <button class="check-btn"><i class="undone far fa-check-circle"></i></button>
//         </div>
//         </div>
//     `
//   }
//   else if(todo.completed === false){
//     todosOutput.innerHTML +=
//     `
//     <div id="${todo.id}" class="row justify-content-center">
//         <div class="col-11 align-self-center border rounded bg-white p-1">
//           <h5 class="todo-text">${todo.title}</h5>
//         </div>
//         <div class="col-1 align-self-center mt-2">
//           <button class="check-btn"><i class="done fas fa-check-circle"></i></button>
//           <button class="check-btn"><i class="trash fas fa-trash-alt"></i></button>
//           </div>
//         </div>
//     `
//   }
// }


// const todoBtn = document.querySelector('.todo-btn');

// const checkTodo = () => {
//   todoBtn.addEventListener('click', e => {
//     e.preventDefault();
//   })

//   if (todos.completed) {
//     document.getElementById("checkBox").classList.add('fas');
//     }
//     else {
//       document.getElementById("checkBox").classList.add('far');
//     }
// }



    // output.addEventListener('click', e => {
    //   if(e.target.classList.contains('btn')) {
    //     todos = todos.filter(todo => todo.id !== e.target.parentNode.id)
    //     listTodos();
    //   }
    
    // })



// const checkBtn = document.querySelector('.check-btn');

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

                           