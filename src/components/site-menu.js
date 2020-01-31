import {createElement} from '../utils.js';
import {SiteMenuSettings} from '../const.js';

const setupFilterTemplate = (link, activeClass, title, count) => {
  return `<a href="${link}" class="main-navigation__item ${activeClass}">
    ${title}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};

const createFilterMarkup = ({title, count}, isActive) => {
  const link = `#${title.toLowerCase()}`;
  const activeClass = isActive ? SiteMenuSettings.CLASS_ACTIVE : ``;
  return setupFilterTemplate(link, activeClass, title, count);
};

const setupSiteMenuTemplate = (filtersMarkup) => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersMarkup}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, i) => {
    const isActive = i === 0;
    return createFilterMarkup(filter, isActive);
  })
  .join(`\n`);
  return setupSiteMenuTemplate(filtersMarkup);
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this.filters);
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
