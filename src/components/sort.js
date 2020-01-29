import {joinMapped} from '../utils.js';
import {SortSettings} from '../const.js';

const setupSortButtonTemplate = (activeClass, title) => {
  return `<li><a href="#" class="sort__button ${activeClass}">Sort by ${title}</a></li>`;
};

const createSortButtonMarkup = ({title, isActive}) => {
  const activeClass = isActive ? SortSettings.CLASS_ACTIVE : SortSettings.CLASS_NON_ACTIVE;
  return setupSortButtonTemplate(activeClass, title);
};

const setupSortTemplate = (sortButtonsMarkup) => {
  return `<ul class="sort">
    ${sortButtonsMarkup}
  </ul>`;
};

const createSortMarkup = (sortButtons) => {
  const sortButtonsMarkup = joinMapped(sortButtons, createSortButtonMarkup, `\n`);
  return setupSortTemplate(sortButtonsMarkup);
};

export {createSortMarkup};
