import {generateFilm} from './film.js';

const generateCatalog = (count) => {
  const films = [];
  for (let i = 0; i < count; i++) {
    films.push(generateFilm());
  }
  return films;
};

export {generateCatalog};
