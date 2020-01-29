import {SortSettings} from '../const.js';

const setupSortButtonTemplate = (activeClass, title) => {
  return `<li><a href="#" class="sort__button ${activeClass}">Sort by ${title}</a></li>`;
};

const createSortButtonMarkup = ({title, isActive}) => {
  const activeClass = isActive ? SortSettings.CLASS_ACTIVE : SortSettings.CLASS_NON_ACTIVE;
  return setupSortButtonTemplate(activeClass, title);
};

export {createSortButtonMarkup};
