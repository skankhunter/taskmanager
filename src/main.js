import filterRender from './rendering/filter-render.js';
import {cards, allFilters} from './data.js';
import Filter from './components/Filter';
import Task from "./task/task";
import TaskEdit from "./task/task-edit";
import moment from 'moment';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';

const FILTERS_TYPES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const filtersContainer = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

let startCards = cards;

const addTask = (parent, currentElement) => {
  parent.appendChild(currentElement.render());
};

const filterTasks = (filterName) => {
  let result = startCards;

  switch (filterName) {
    case `overdue`:
      result = startCards.filter((it) => it.dueDate < Date.now());
      break;
    case `today`:
      result = startCards.filter((it) => moment(it.dueDate).format(`DD`) === moment(Date.now()).format(`DD`));
      break;
    case `favorites`:
      result = startCards.filter((it) => it.isFavorite);
      break;
    case `repeating`:
      result = startCards.filter((it) => it.isRepeated);
      break;
    case `tags`:
      result = startCards.filter((it) => [...it.tags].length > 0);
      break;
    case `archive`:
      result = startCards.filter((it) => it.isDone);
      break;
  }

  return result;
};

const updateFiltersList = () => {
  // filtersList.forEach((it) => {
  //   it.update(filterTasks(it.type).length);
  //
  //   const oldFilter = it.element;
  //   it.unrender();
  //   filtersContainer.replaceChild(it.render(), oldFilter);
  // });
  clearBlock(filtersContainer);
  renderFiltersList(
      createFiltersList()
  );
};

const createFilter = (filterType) => {
  const filter = new Filter(filterType, filterTasks(filterType).length);

  filter.onFilter = () => {
    const filteredTasks = filterTasks(filterType);
    clearBlock(boardTasks);
    createAllCards(filteredTasks);
  };

  return filter;
};

const createCardElement = (parent, data) => {
  const task = new Task(data);
  const taskEdit = new TaskEdit(data);
  task.onEdit = () => {
    taskEdit.render();
    boardTasks.replaceChild(taskEdit.element, task.element);
    task.unrender();
  };

  taskEdit.onSubmit = (newObject) => {
    task.title = newObject.title;
    task.tags = newObject.tags;
    task.color = newObject.color;
    task.repeatingDays = newObject.repeatingDays;
    task.dueDate = newObject.dueDate;

    task.update(task);
    task.render();
    boardTasks.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
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
    deleteTask(taskEdit);
    boardTasks.removeChild(taskEdit.element);
    taskEdit.unrender();
    updateFiltersList();
  };

  addTask(parent, task);
};

const deleteTask = (task) => {
  startCards = startCards.filter((point) => point.token !== task._token);
};

const createAllCards = (array) => {
  for (const el of array) {
    createCardElement(boardTasks, el);
  }
};

const clearBlock = (block) => {
  block.innerHTML = ``;
};

createAllCards(startCards);

const createFiltersList = () => FILTERS_TYPES.map((it) => createFilter(it));
const renderFilter = (filter) => filtersContainer.appendChild(filter.render());
const renderFiltersList = (filtersList) => filtersList.forEach((it) => renderFilter(it));

const filtersList = createFiltersList();

renderFiltersList(filtersList);


//
//
// const HIDDEN_CLASS = `visually-hidden`;
//
// const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));
//
// const tasksBtn = document.querySelector(`#control__task`);
// const statisticsBtn = document.querySelector(`#control__statistic`);
//
// const taskContainer = document.querySelector(`.board.container`);
// const statisticContainer = document.querySelector(`.statistic.container`);
//
// const allContainers = [taskContainer, statisticContainer];
//
// tasksBtn.addEventListener(`click`, () => {
//   closeAllContainer();
//   taskContainer.classList.remove(HIDDEN_CLASS);
// });
//
// statisticsBtn.addEventListener(`click`, () => {
//   closeAllContainer();
//   statisticContainer.classList.remove(HIDDEN_CLASS);
//   // updateCharts();
// });
