const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

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
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  types: [`repeat`, `deadline`, ``],
  colors: [`black`, `pink`, `yellow`, `blue`, `red`],
  isFavorite: false,
  isDone: false,
  get hashtags() {
    const setTags = [...this.tags];
    shuffleArray(setTags);
    const randomNum = getRandomNum(4);
    return setTags.slice(0, randomNum).map((el) => `<span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #${el}
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>`).join(``);
  }
};

const createPointData = (count, data) => {
  const newCards = [];
  for (let i = 0; i <= count; i++) {
    newCards.push({
      title: getRandomElement(data.title),
      tags: data.hashtags,
      picture: data.picture,
      repeatingDays: data.repeatingDays,
      type: getRandomElement(data.types),
      color: getRandomElement(data.colors),
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    });
  }
  return newCards;
};


const generateData = () => {
  const cards = {};
  for (const el of allFilters) {
    cards[`${el.id}`] = createPointData(el.count, task);
  }
  return cards;
};

const cards = generateData();

export {cards, allFilters};
