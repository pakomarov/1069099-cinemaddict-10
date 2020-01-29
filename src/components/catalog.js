import {joinMapped} from '../utils.js';
import {createFilmMarkup} from './film.js';
import {createShowMoreButtonMarkup} from './show-more-button.js';

const setupCatalogTemplate = (filmsMarkup, showMoreButtonMarkup) => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
      ${filmsMarkup}
    </div>

    ${showMoreButtonMarkup}
  </section>`;
};

const createCatalogMarkup = (catalog) => {
  const filmsMarkup = joinMapped(catalog, createFilmMarkup, `\n`);
  const showMoreButtonMarkup = createShowMoreButtonMarkup();
  return setupCatalogTemplate(filmsMarkup, showMoreButtonMarkup);
};

export {createCatalogMarkup};
