import {createElement} from '../utils.js';

const createBriefStatsTemplate = (catalogSize) => {
  return `<section class="footer__statistics">
    <p>${catalogSize} movies inside</p>
  </section>`;
};

export default class BriefStats {
  constructor(catalogSize) {
    this._catalogSize = catalogSize;
    this._element = null;
  }

  getTemplate() {
    return createBriefStatsTemplate(this._catalogSize);
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
