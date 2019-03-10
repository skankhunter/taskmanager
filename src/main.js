import filterRender from './rendering/filter-render.js';
import {cards, allFilters} from './data.js';
import Task from "./task/task";
import TaskEdit from "./task/task-edit";

const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const startFilter = cards.all;

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
};

const addTask = (parent, currentElement) => {
  parent.appendChild(currentElement.render());
};

const createFilterElement = (parent, id, count, checked, disabled) => {
  let currentFilter = filterRender(id, count, checked, disabled);
  addElement(parent, currentFilter);
};

const createAllFilters = (array) => {
  for (let el of array) {
    createFilterElement(filter, el.id, el.count, el.checked, el.disabled);
  }
};

createAllFilters(allFilters);

const createCardElement = (parent, data) => {
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);
  taskComponent.onEdit = () => {
    editTaskComponent.render();
    boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };
  addTask(parent, taskComponent);
};

const createAllCards = (array) => {
  for (const el of array) {
    createCardElement(boardTasks, el);
  }
};

const clearBlock = (block) => {
  block.innerHTML = ``;
};

const filterInput = document.querySelectorAll(`.filter__input`);


const getCurrentFilter = (target) => {
  const currentId = target.getAttribute(`id`);
  return currentId.split(`__`)[1];
};

const renderCards = (target, data) => {
  const filterTarget = getCurrentFilter(target);
  createAllCards(data[`${filterTarget}`]);
};

for (const el of filterInput) {
  el.addEventListener(`change`, function (e) {
    const target = e.target;
    clearBlock(boardTasks);
    renderCards(target, cards);
  });
}

createAllCards(startFilter);
