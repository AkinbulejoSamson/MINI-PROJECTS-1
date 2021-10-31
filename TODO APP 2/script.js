const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => {
    addTodo(todo);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
})

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }
  
    todoEl.innerHTML = `
      ${todoText}
      <button id="delete"><i class="fas fa-times"></i></button>
    `;
  
    todoEl.addEventListener('dblclick', () => {
      todoEl.classList.toggle('completed');

      updateLS();
    })
    
    const deleteBtn = todoEl.querySelector('#delete');
    
    deleteBtn.addEventListener('dblclick', () => {
      todoEl.remove();

      updateLS();
    })
    
    todoUl.appendChild(todoEl);
  }
  input.value = '';
  
}
 
function updateLS() {
  const todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    })
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}