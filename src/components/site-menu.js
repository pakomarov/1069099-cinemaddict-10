import {joinMapped} from '../utils.js';

const setupFilterTemplate = (link, text, count) => {
  return `<a href="${link}" class="main-navigation__item">${text} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterMarkup = ({title, count}) => {
  const link = `#${title.toLowerCase()}`;
  return setupFilterTemplate(link, title, count);
};

const setupSiteMenuTemplate = (filterListMarkup) => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterListMarkup}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

const createSiteMenuMarkup = (filters) => {
  const filterListMarkup = joinMapped(filters, createFilterMarkup, `\n`);
  return setupSiteMenuTemplate(filterListMarkup);
};

export {createSiteMenuMarkup};
