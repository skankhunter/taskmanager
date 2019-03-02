import filterRender from './filter-render.js';
import cardRender from './make-card.js';
import {task, allFilters} from './data.js';

const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const startCardsCount = 7;

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
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

const createCardData = (count, data) => {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    tasks.push({
      title: getRandomElement(data.title),
      tags: data.getHashtags(),
      picture: data.getPicture(),
      repeatingDays: data.repeatingDays,
      type: getRandomElement(data.types),
      color: getRandomElement(data.colors),
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    });
  }
  return tasks;
};

const createCardElement = (parent, data) => {
  let currentCard = cardRender(data);
  addElement(parent, currentCard);
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

const createNewCards = (count) => {
  if (typeof (count) === `number`) {
    const currentDataArray = createCardData(count, task);
    createAllCards(currentDataArray);
  }
};

for (const el of filterInput) {
  el.addEventListener(`change`, function (e) {
    const currentLabel = e.target.nextElementSibling;
    const currentCount = Number(currentLabel.querySelector(`span`).textContent);
    clearBlock(boardTasks);
    createNewCards(currentCount);
  });
}

createNewCards(startCardsCount);
