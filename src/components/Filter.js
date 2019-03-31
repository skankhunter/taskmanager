import Component from './TaskComponent';

export default class Filter extends Component {
  constructor(type, count) {
    super();
    this._type = type;
    this._countTask = count;

    this._onFilterLabelClick = this._onFilterLabelClick.bind(this);

    this._onFilter = null;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterLabelClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `<div>
        <input
          type="radio"
          id="filter__${this._type}"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__${this._type}" class="filter__label">
          ${this._type.toUpperCase()}
          <span class="filter__${this._type}-count">${this._countTask}</span></label>
      </div>`;
  }

  createListeners() {
    this._element.querySelector(`.filter__input`)
      .addEventListener(`click`, this._onFilterLabelClick);
  }

  removeListeners() {
    this._element.querySelector(`.filter__input`)
      .removeEventListener(`click`, this._onFilterLabelClick);
  }

  update(count) {
    this._countTask = count;
  }
}
