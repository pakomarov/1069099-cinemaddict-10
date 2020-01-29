import {joinMapped} from '../utils.js';
import {createSortButtonMarkup} from './sort-button.js';

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
