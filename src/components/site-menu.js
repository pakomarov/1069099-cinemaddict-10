import {joinMapped} from '../utils.js';
import {createFilterMarkup} from './filter.js';

const setupSiteMenuTemplate = (filtersMarkup) => {
  return `<nav class="main-navigation">
    ${filtersMarkup}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

const createSiteMenuMarkup = (filters) => {
  const filtersMarkup = joinMapped(filters, createFilterMarkup, `\n`);
  return setupSiteMenuTemplate(filtersMarkup);
};

export {createSiteMenuMarkup};
