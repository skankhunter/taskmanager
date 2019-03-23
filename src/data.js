import {getRandomNum, shuffleArray} from "./helpers/helpers";
import {createCardData} from "./helpers/create-card";

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

const task = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
    `Покекать`,
    `Посмотреть мэмы`
  ],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `kek`
  ]),
  get picture() {
    return `//picsum.photos/100/100?r=${Math.random()}`;
  },
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  types: [`repeat`, `deadline`, ``],
  colors: [`black`, `pink`, `yellow`, `blue`, `red`, `green`],
  isFavorite: false,
  isDone: false,
  get hashtags() {
    const setTags = [...this.tags];
    shuffleArray(setTags);
    const randomNum = getRandomNum(4);
    return setTags.slice(0, randomNum);
  }
};

const generateData = () => {
  const cards = {};
  for (const el of allFilters) {
    cards[`${el.id}`] = createCardData(el.count, task);
  }
  return cards;
};

const cards = generateData();

export {cards, allFilters};
