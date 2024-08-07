const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');
const taskContainer = document.querySelector('.task-container');
const totalContainer = document.querySelector('.total');
const pendingContainer = document.querySelector('.pending');
const finishedContainer = document.querySelector('.finished');
let taskList = [];
let taskInit = [{
  id: 5915,
  title: 'Limpiar la casa',
  finished: false
},
{
  id: 7792,
  title: 'Cocinar para hoy y mañana',
  finished: false
},
{
  id: 5858,
  title: 'Sacar la basura de la cocina y baño',
  finished: false
}]

const addTask = (title) => {
  if (!title || title.length == 0) return;
  const id = Math.floor(Math.random() * 9000) + 1000;
  const task = {
    id: id,
    title: title,
    finished: false
  };
  taskList.push(task);

  const row = `
      <div id="task-${id}" class="task" style="overflow: hidden; outline: 1px solid ${'rgb(255,0,0,0.5)'};
         background: rgb(255,0,0,0.1)">
        <div style="display: flex; gap: 1rem; align-items: center; overflow-wrap: break-word;">
          <div>
            <p style="font-style: italic; 
              font-weight: bold;">ID</p>
            <p>${id}</p>
          </div>
          <div class="title">
            <p style="font-style: italic; 
              font-weight: bold;">Nombre</p>
            <p>${title}</p>
          </div>
        </div>
        <div class="actions">
          <small id="small-${id}">${'Pendiente'}</small>
          <div class="task-buttons">
            <div class="check" >
              <div id="check-${id}">
                <input id="input-${id}" type="checkbox" onchange="finishTask('${id}', '#input-${id}')">
              </div>
            </div>
            <div class="check">
              <div id="delete-${id}" onclick="deleteTask('${id}')" alt="">
            </div>
          </div>
        </div>
      </div>
    `;

  taskContainer.insertAdjacentHTML('beforeend', row);
  taskInput.value = '';
  const checkContainer = document.querySelector(`#check-${id}`);
  const deleteContainer = document.querySelector(`#delete-${id}`);
  checkContainer.style.backgroundImage = 'url("src/assets/img/processing.png")';
  deleteContainer.style.backgroundImage = 'url("src/assets/img/delete.png")';
  calculateStats();
};

const deleteTask = (id) => {
  taskList = taskList.filter((task) => task.id != id);
  document.querySelector(`#task-${id}`).remove();
  calculateStats();
};

const finishTask = (id, inputId) => {
  const checked = document.querySelector(inputId).checked;
  const checkContainer = document.querySelector(`#check-${id}`);
  const taskRow = document.querySelector(`#task-${id}`);
  const small = document.querySelector(`#small-${id}`);
  let task = taskList.find((task) => task.id == id);

  if (task && checked != null) {
    task.finished = checked;
    small.textContent = checked ? 'Finalizada' : 'Pendiente';
    taskRow.style.outline = checked
      ? '1px solid rgba(40,201,55,1)'
      : '1px solid rgba(255,0,0,0.5)';

    taskRow.style.background = checked
      ? 'rgba(40,201,55,0.1)'
      : 'rgba(255,0,0,0.1)';

    checkContainer.style.backgroundImage = checked
      ? 'url("src/assets/img/check.png")'
      : 'url("src/assets/img/processing.png")';
  }
  calculateStats();
};

const calculateStats = () => {
  totalContainer.textContent = `Total: ${taskList.length}`;
  pendingContainer.textContent = `Pendientes ${
    [...taskList].filter((task) => !task.finished).length
  }`;
  finishedContainer.textContent = `Finalizadas: ${
    [...taskList].filter((task) => task.finished).length
  }`;
  taskInput.value = '';
  document.querySelector('.empty').style.display =
    taskList.length == 0 ? 'grid' : 'none';
};

const init = () => {
  taskInit.forEach(task => addTask(task.title))
};

// Listeners
addButton.addEventListener('click', () => addTask(taskInput.value));
taskInput.addEventListener('keydown', (event) => {
  const keycode = event.keyCode || event.which;
  if (keycode == 13) addTask(taskInput.value);
});
window.taskList = taskList;

// Init
init()

