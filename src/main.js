'use strict';
const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const arr = [1, 2, 3, 4, 5, 6, 7];

function randomNum() {
  return Math.floor(Math.random() * arr.length);
}

function filterRender(id, param) {
  const label = document.createElement(`label`);
  const input = document.createElement(`input`);
  const innerLabel = `${id}<span class="filter__${id}-count">${param}</span>`;

  label.setAttribute(`for`, `filter__${id}`);
  label.innerHTML = innerLabel;
  label.classList.add(`filter__label`);
  input.setAttribute(`type`, `radio`);
  input.setAttribute(`id`, `filter__${id}`);
  input.classList.add(`filter__input`, `visually-hidden`);
  input.setAttribute(`name`, `filter`);
  // input.setAttribute(`checked`); TODO: need to add 'check'?
  filter.appendChild(input);
  filter.appendChild(label);
}

arr.forEach(function (el) {
  filterRender(el, randomNum());
});

// for (let i = 0; i < filters.length; i++) {
//   filters[i].addEventListener(`click`, function (event) {
//     onFilterClickHandler(event);
//   });
// }
//
// function onFilterClickHandler(event) {
//
// }
