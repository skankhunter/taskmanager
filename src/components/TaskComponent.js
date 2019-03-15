import {createElement} from "../helpers/сreate-element";

class TaskComponent {
  constructor() {
    if (new.target === TaskComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    return this._element;
  }

  createListeners() {}

  removeListeners() {}

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }

  update() {}
}

export default TaskComponent;
