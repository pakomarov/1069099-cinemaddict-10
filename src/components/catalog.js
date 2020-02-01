import {createElement} from '../utils.js';

const createCatalogTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`;
};

export default class Catalog {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCatalogTemplate();
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
