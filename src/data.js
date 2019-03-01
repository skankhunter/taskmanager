function getRandomNum() {
  return Math.floor(Math.random() * 5);
}

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
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
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
  getHashtags() {
    let tags = [];
    const setArrayTags = [...this.tags];
    for (let i = 0; i < 3; i++) {
      const el = setArrayTags[getRandomNum()];
      tags.push(el);
    }
    return tags.map((el) => `<span class="card__hashtag-inner">
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

export {task, allFilters};
