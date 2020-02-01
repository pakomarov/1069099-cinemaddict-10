import {createElement} from '../utils.js';
import {SortSettings} from '../const.js';

const createSortButtonMarkup = (activeClass, title) => {
  return `<li><a href="#" class="sort__button ${activeClass}">Sort by ${title}</a></li>`;
};

const setupSortTemplate = (sortButtonsMarkup) => {
  return `<ul class="sort">
    ${sortButtonsMarkup}
  </ul>`;
};

const createSortTemplate = () => {
  const sortButtonsMarkup = SortSettings.BUTTONS_TITLES.map((title, i) => {
    const activeClass = i === 0 ? SortSettings.CLASS_ACTIVE : ``;
    return createSortButtonMarkup(activeClass, title);
  })
  .join(`\n`);
  return setupSortTemplate(sortButtonsMarkup);
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
