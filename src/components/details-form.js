import {createElement} from '../utils.js';

const createDetailsFormTemplate = () => {
  return `<form class="film-details__inner" action="" method="get">
    </form>`;
};

export default class DetailsForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDetailsFormTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
