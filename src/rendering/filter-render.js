export default (id, count, checked = false, disabled = false) => {
  const input = `<input type="radio" id="filter__${id}" class="filter__input visually-hidden" ${disabled ? `disabled` : ``} name="filter" ${checked ? `checked` : ``}/>`;
  const label = `<label for="filter__${id}" class="filter__label">${id} <span class="filter__${id}-count">${count}</span></label>`;
  return `${input} ${label}`;
};
