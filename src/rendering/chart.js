// import {tasksList} from "../task/task-creation";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

const HIDDEN_CLASS = `visually-hidden`;

// const taskContainer = document.querySelector(`.board.container`);
// const statisticContainer = document.querySelector(`.statistic.container`);
// const allContainers = [taskContainer, statisticContainer];

// const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));
//
// const tasksBtn = document.querySelector(`#control__task`);
// const statisticsBtn = document.querySelector(`#control__statistic`);

[`.statistic__tags-wrap`, `.statistic__colors-wrap`].forEach((it) => {
  document.querySelector(it).classList.remove(HIDDEN_CLASS);
});

// const openTasksContainer = () => {
//   closeAllContainer();
//   taskContainer.classList.remove(HIDDEN_CLASS);
// };
//
// const openStatisticContainer = () => {
//   closeAllContainer();
//   statisticContainer.classList.remove(HIDDEN_CLASS);
//   updateCharts();
// };
//
// tasksBtn.addEventListener(`click`, openTasksContainer);
// statisticsBtn.addEventListener(`click`, openStatisticContainer);

const chartLabelFn = (tooltipItem, data) => {
  const allData = data.datasets[tooltipItem.datasetIndex].data;
  const tooltipData = allData[tooltipItem.index];
  const total = allData.reduce((acc, it) => acc + parseFloat(it));
  const tooltipPercentage = Math.round((tooltipData / total) * 100);
  return `${data.labels[tooltipItem.index]}(${tooltipData}) — ${tooltipPercentage}%`;
};

const createDataChart = (data, titleText) => {
  return {
    plugins: [ChartDataLabels],
    type: `pie`,
    data,
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: chartLabelFn
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
        text: titleText,
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
  };
};

function getTasksTags() {
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

function getTasksColors() {
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
  // const dataChartTasksColor = getTasksColors();
  // const dataChartTasksTags = getTasksTags();
  //
  // chartTags.data.datasets[0].data = dataChartTasksTags.data;
  // chartColors.data.datasets[0].data = dataChartTasksColor.data;
  //
  // chartTags.update();
  // chartColors.update();
};

// const dataChartTasksTags = getTasksTags();
// const dataChartTasksColors = getTasksColors();
//
// const chartTags = new Chart(tagsCtx, createDataChart({
//   labels: dataChartTasksTags.labels,
//   datasets: [{
//     data: dataChartTasksTags.data,
//     backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
//   }]
// }, `DONE BY: TAGS`));
//
// const chartColors = new Chart(colorsCtx, createDataChart({
//   labels: dataChartTasksColors.labels,
//   datasets: [dataChartTasksColors.datasets]
// }, `DONE BY: COLORS`));

export {updateCharts};
