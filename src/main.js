import {cards} from './data.js';
import Filter from './components/Filter';
import Task from "./task/task";
import TaskEdit from "./task/task-edit";
import moment from 'moment';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

// Statisctics

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

const HIDDEN_CLASS = `visually-hidden`;

const taskContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic.container`);
const allContainers = [taskContainer, statisticContainer];

const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));

const tasksBtn = document.querySelector(`#control__task`);
const statisticsBtn = document.querySelector(`#control__statistic`);

tasksBtn.addEventListener(`click`, () => {
  closeAllContainer();
  taskContainer.classList.remove(HIDDEN_CLASS);
});

statisticsBtn.addEventListener(`click`, () => {
  closeAllContainer();
  statisticContainer.classList.remove(HIDDEN_CLASS);
  // updateCharts();
});

[`.statistic__tags-wrap`, `.statistic__colors-wrap`].forEach((it) => {
  document.querySelector(it).classList.remove(HIDDEN_CLASS);
});

const openTasksContainer = () => {
  closeAllContainer();
  taskContainer.classList.remove(HIDDEN_CLASS);
};

const openStatisticContainer = () => {
  closeAllContainer();
  statisticContainer.classList.remove(HIDDEN_CLASS);
  updateCharts();
};

tasksBtn.addEventListener(`click`, openTasksContainer);
statisticsBtn.addEventListener(`click`, openStatisticContainer);

function getTasksTags(tasks) {
  const tags = {};
  const data = [];

  for (let task of tasks) {
    for (let tag of task.tags) {
      if (!tags.hasOwnProperty(tag)) {
        tags[`#` + tag] = 1;
      } else {
        tags[tag]++;
      }
    }
  }

  for (let prop in tags) {
    data.push(tags[prop]);
  }

  return {
    uniqTags: Object.keys(tags),
    data
  };
}

function getTasksColors(tasks) {
  const colors = {};
  const data = [];

  for (let task of tasks) {
    if (!colors.hasOwnProperty(task.color)) {
      colors[task.color] = 1;
    } else {
      colors[task.color]++;
    }
  }

  for (let prop in colors) {
    data.push(colors[prop]);
  }

  return {
    uniqColors: Object.keys(colors),
    data
  };
}

const updateCharts = () => {
  const dataChartTasksColor = getTasksColors(startCards);
  const dataChartTasksTags = getTasksTags(startCards);

  tagsChart.data.datasets[0].data = dataChartTasksTags.data;
  colorsChart.data.datasets[0].data = dataChartTasksColor.data;

  tagsChart.update();
  colorsChart.update();
};

const dataChartTasksTags = getTasksTags(startCards);
const dataChartTasksColors = getTasksColors(startCards);

const tagsChart = new Chart(tagsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: dataChartTasksTags.uniqTags,
    datasets: [{
      data: dataChartTasksTags.data,
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});

const colorsChart = new Chart(colorsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: dataChartTasksColors.uniqColors,
    datasets: [{
      data: dataChartTasksColors.data,
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});
