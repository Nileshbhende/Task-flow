document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('input-box');
  const addBtn = document.getElementById('add-btn');
  const listContainer = document.getElementById('list-container');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  const taskCount = document.getElementById('task-count');

  // Update task count
  function updateTaskCount() {
    const tasks = listContainer.querySelectorAll('li');
    const remainingTasks = Array.from(tasks).filter(task => !task.classList.contains('completed')).length;
    taskCount.textContent = `Tasks Remaining: ${remainingTasks}`;
  }

  // Add a new task
  function addTask(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text}
      <span>
        <i class="fa-solid fa-star" title="Mark as important"></i>
        <i class="fa-solid fa-edit" title="Edit"></i>
        <i class="fa-solid fa-trash" title="Delete"></i>
      </span>`;
    listContainer.appendChild(li);
    updateTaskCount();
  }

  // Handle task actions
  function handleTaskAction(e) {
    const target = e.target;

    if (target.classList.contains('fa-trash')) {
      target.closest('li').remove();
      updateTaskCount();
    } else if (target.classList.contains('fa-edit')) {
      const li = target.closest('li');
      const newText = prompt('Edit task:', li.textContent.trim());
      if (newText) {
        li.firstChild.textContent = newText;
      }
    } else if (target.classList.contains('fa-star')) {
      target.closest('li').classList.toggle('important');
    } else if (target.tagName === 'LI') {
      target.classList.toggle('completed');
      updateTaskCount();
    }
  }

  // Clear completed tasks
  function clearCompletedTasks() {
    const completedTasks = listContainer.querySelectorAll('li.completed');
    completedTasks.forEach(task => task.remove());
    updateTaskCount();
  }

  addBtn.addEventListener('click', () => {
    const taskText = inputBox.value.trim();
    if (taskText) {
      addTask(taskText);
      inputBox.value = '';
    }
  });

  listContainer.addEventListener('click', handleTaskAction);
  clearCompletedBtn.addEventListener('click', clearCompletedTasks);
});
