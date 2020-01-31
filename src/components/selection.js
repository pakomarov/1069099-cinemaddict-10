import {createElement} from '../utils.js';

const createSelectionTemplate = (title) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
  </section>`;
};

export default class Selection {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createSelectionTemplate(this._title);
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
