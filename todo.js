const addButton = document.getElementById('add-btn');
const inputField = document.getElementById('todo-input');
const pendingTasks = document.getElementById('pending-tasks');
const completedTasks = document.getElementById('completed-tasks');
const navHome = document.getElementById('nav-home');
const navPending = document.getElementById('nav-pending');
const navCompleted = document.getElementById('nav-completed');
const homeView = document.getElementById('home-view');
const pendingView = document.getElementById('pending-view');
const completedView = document.getElementById('completed-view');
const todoHeader = document.getElementById('todo-header');


function createTaskItem(taskText, isComplete = false) {
    const listItem = document.createElement('li');
    if (isComplete) {
        listItem.classList.add('complete');
    }

    const taskContent = document.createElement('div');
    taskContent.textContent = taskText;

    const taskTime = document.createElement('div');
    const currentTime = new Date();
    taskTime.textContent = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    taskTime.classList.add('task-time');

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = isComplete ? 'Undo' : 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', () => {
        if (listItem.classList.contains('complete')) {
            listItem.classList.remove('complete');
            completeButton.textContent = 'Complete';
            pendingTasks.appendChild(listItem);
        } else {
            listItem.classList.add('complete');
            completeButton.textContent = 'Undo';
            completedTasks.appendChild(listItem);
        }
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', () => {
        const newTaskText = prompt('Edit your task:', taskContent.textContent);
        if (newTaskText) {
            taskContent.textContent = newTaskText;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
        listItem.remove();
    });

    taskActions.appendChild(completeButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    listItem.appendChild(taskContent);
    listItem.appendChild(taskTime);
    listItem.appendChild(taskActions);

    return listItem;
}


addButton.addEventListener('click', () => {
    const taskText = inputField.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = createTaskItem(taskText);
    pendingTasks.appendChild(taskItem);

    inputField.value = '';
});


inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
});


navHome.addEventListener('click', () => {
    todoHeader.querySelector('h1').textContent = 'Home';
    homeView.classList.remove('hidden');
    pendingView.classList.add('hidden');
    completedView.classList.add('hidden');
});

navPending.addEventListener('click', () => {
    todoHeader.querySelector('h1').textContent = 'Pending Tasks';
    pendingView.classList.remove('hidden');
    homeView.classList.add('hidden');
    completedView.classList.add('hidden');
});

navCompleted.addEventListener('click', () => {
    todoHeader.querySelector('h1').textContent = 'Completed Tasks';
    completedView.classList.remove('hidden');
    homeView.classList.add('hidden');
    pendingView.classList.add('hidden');
});