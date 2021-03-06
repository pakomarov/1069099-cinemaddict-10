import {createElement, joinMapped} from '../utils.js';

const setupFilterTemplate = (link, title, count) => {
  return `<a href="${link}" class="main-navigation__item">
    ${title}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};

const createFilterMarkup = ({title, count}) => {
  const link = `#${title.toLowerCase()}`;
  return setupFilterTemplate(link, title, count);
};

const setupSiteMenuTemplate = (filtersMarkup) => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersMarkup}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = joinMapped(filters, createFilterMarkup, `\n`);
  return setupSiteMenuTemplate(filtersMarkup);
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
