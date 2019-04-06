import {filtersList, renderFiltersList} from "./rendering/filter-util";
import {} from './task/task-creation';
import {updateCharts} from "./rendering/chart";

renderFiltersList(filtersList);

const HIDDEN_CLASS = `visually-hidden`;

const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));

const tasksBtn = document.querySelector(`#control__task`);
const statisticsBtn = document.querySelector(`#control__statistic`);

const taskContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic.container`);

const allContainers = [taskContainer, statisticContainer];

tasksBtn.addEventListener(`click`, () => {
  closeAllContainer();
  taskContainer.classList.remove(HIDDEN_CLASS);
});

statisticsBtn.addEventListener(`click`, () => {
  closeAllContainer();
  statisticContainer.classList.remove(HIDDEN_CLASS);
  updateCharts();
});
