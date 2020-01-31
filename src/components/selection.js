import {joinMapped} from '../utils.js';
import {createFilmMarkup} from './film.js';

const setupSelectionTemplate = (title, filmsMarkup) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${filmsMarkup}
    </div>
  </section>`;
};

const createSelectionMarkup = ({title, selectedFilms}) => {
  if (selectedFilms === null) {
    return ``;
  }

  const selectedFilmsMarkup = joinMapped(selectedFilms, createFilmMarkup, `\n`);
  return setupSelectionTemplate(title, selectedFilmsMarkup);
};

export {createSelectionMarkup};
