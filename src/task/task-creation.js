import {updateFiltersList} from '../rendering/filter-util';
import Task from './task';
import TaskEdit from './task-edit';
import API from "../backend-api";

const StatusEditForm = {
  SUBMIT: `submit`,
  DELETE: `delete`
};

const HIDDEN_CLASS = `visually-hidden`;

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const boardTasks = document.querySelector(`.board__tasks`);
const boardNoTasks = document.querySelector(`.board__no-tasks`);
boardNoTasks.classList.remove(HIDDEN_CLASS);
boardNoTasks.innerHTML = `Loading tasks...`;

const createTasksList = (dataTasksList) => dataTasksList.map((it) => createCardElement(it));

const createCardElement = (data) => {
  const task = new Task(data);
  const taskEdit = new TaskEdit(data);

  task.onEdit = () => {
    taskEdit.render();
    boardTasks.replaceChild(taskEdit.element, task.element);
    task.unrender();
  };

  taskEdit.onSubmit = (newObject) => {
    task.update(newObject);

    api.updateTask({id: task._id, data: task.toRAW()})
      .then(() => {
        task.render();
        boardTasks.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      })
      .catch(() => {
        // taskEdit.includedForm(StatusEditForm.SUBMIT);
      });
  };

  taskEdit.onEsc = (initialObject) => {
    task.color = initialObject.color;

    taskEdit._state.isDate = false;
    taskEdit._state.isRepeated = false;

    taskEdit.update(initialObject);
    task.render();
    boardTasks.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
  };

  taskEdit.onDelete = () => {
    api.deleteTask({id: task._id})
      .then(() => api.getTasks())
      .then(() => {
        deleteTask(taskEdit);
        boardTasks.removeChild(taskEdit.element);
        taskEdit.unrender();
        updateFiltersList();
      })
      .catch(() => {
      });
  };

  return task;
};

const deleteTask = (delTask) => {
  for (let i = 0; i < tasksList.length; i++) {
    const task = tasksList[i];

    if (task._id === delTask._id) {
      tasksList.splice(i, 1);
      break;
    }
  }
};

const renderTask = (task) => boardTasks.appendChild(task.render());

const renderTasksList = (tasksList) => tasksList.forEach((it) => renderTask(it));

let tasksList = [];

api.getTasks()
    .then((tasks) => {
      boardNoTasks.classList.add(HIDDEN_CLASS);
      tasksList = createTasksList(tasks);
      renderTasksList(tasksList);
      updateFiltersList();
    })
    .catch(() => {
      boardNoTasks.innerHTML = `Something went wrong while loading your tasks. Check your connection or try again later`;
    });

export {
  tasksList,
  createCardElement,
  createTasksList,
  renderTask,
  renderTasksList,
  deleteTask
};
