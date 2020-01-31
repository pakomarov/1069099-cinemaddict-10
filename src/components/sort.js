import {SortSettings} from '../const.js';

const createSortButtonMarkup = (activeClass, title) => {
  return `<li><a href="#" class="sort__button ${activeClass}">Sort by ${title}</a></li>`;
};

const setupSortTemplate = (sortButtonsMarkup) => {
  return `<ul class="sort">
    ${sortButtonsMarkup}
  </ul>`;
};

const createSortMarkup = () => {
  const sortButtonsMarkup = SortSettings.BUTTONS_TITLES.map((title, i) => {
    const activeClass = i === 0 ? SortSettings.CLASS_ACTIVE : ``;
    return createSortButtonMarkup(activeClass, title);
  })
  .join(`\n`);
  return setupSortTemplate(sortButtonsMarkup);
};

export {createSortMarkup};
