import filterRender from './filter-render.js';
import cardRender from './make-card.js';

const filter = document.querySelector(`.main__filter`);

const boardTasks = document.querySelector(`.board__tasks`);
const allFilters = [
  {
    id: `all`,
    count: 3,
    checked: true,
    disabled: false
  },
  {
    id: `overdue`,
    count: 5,
    checked: false,
    disabled: false
  },
  {
    id: `today`,
    count: 3,
    checked: false,
    disabled: false
  },
  {
    id: `favorites`,
    count: 2,
    checked: false,
    disabled: false
  },
  {
    id: `repeating`,
    count: 7,
    checked: false,
    disabled: false
  },
  {
    id: `tags`,
    count: 2,
    checked: false,
    disabled: true
  },
  {
    id: `archive`,
    count: 3,
    checked: false,
    disabled: false
  }
];
const dataStorage = {
  types: [`repeat`, `deadline`, ``],
  colors: [`black`, `pink`, `yellow`, `blue`, `red`],
  descriptions: [
    `Kek`,
    `Lol`,
    `Arbidol`,
  ],
};
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

const createCardData = (count, currentData) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      type: getRandomElement(currentData.types),
      color: getRandomElement(currentData.colors),
      description: getRandomElement(currentData.descriptions),
    });
  }
  return data;
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
    const currentDataArray = createCardData(count, dataStorage);
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
