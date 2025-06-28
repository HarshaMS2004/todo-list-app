let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('dueDate').value;
  if (!input.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: input.value.trim(),
    completed: false,
    priority,
    dueDate,
  });

  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const newText = prompt('Edit task:');
  if (newText !== null) {
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
    saveTasks();
    renderTasks();
  }
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function renderTasks() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(search))
    .forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})" />
        ${task.text} [${task.priority}] ${task.dueDate ? `(${task.dueDate})` : ''}
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      `;
      list.appendChild(li);
    });
}

document.getElementById('searchInput').addEventListener('input', renderTasks);

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

renderTasks();
