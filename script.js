let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');
let todos = [];

window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo, index) => addtodo(todo, index));
};

button.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        todos.push(input.value);
        localStorage.setItem('todos', JSON.stringify(todos));
        addtodo(input.value, todos.length - 1);
        input.value = '';
    }
});

function addtodo(todo, index) {
    let para = document.createElement('p');
    para.innerText = `${index + 1}. ${todo}`;
    para.className = 'todo-item';
    todoList.appendChild(para);
    
    para.addEventListener('click', () => {
        para.style.textDecoration = 'line-through';
        para.style.color = '#888';
    });
    para.addEventListener('dblclick', () => {
        todoList.removeChild(para);
        remove(todo);
        updateTodoList();
    });
}

function remove(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => addtodo(todo, index));
}
