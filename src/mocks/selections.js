import {SelectionSettings} from '../const.js';

const getCatalogSortedByRating = (catalog) => catalog.slice()
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

const isTopRatedFilmRated = (topRatedFilm) => topRatedFilm.filmInfo.totalRating !== 0;

const getCatalogSortedByComments = (catalog) => catalog.slice()
  .sort((a, b) => b.comments.length - a.comments.length);

const hasMostCommentedFilmComments = (mostCommentedFilm) => mostCommentedFilm.comments.length > 0;

const pickEnough = (sortedCatalog) => sortedCatalog.slice(0, SelectionSettings.COUNT);

const selectFilms = (selectionTitle, films) => {
  if (films.length === 0) {
    return null;
  }

  let sortingMethod;
  let selectionValidationMethod;

  switch (selectionTitle) {
    case `Top rated`:
      sortingMethod = getCatalogSortedByRating;
      selectionValidationMethod = isTopRatedFilmRated;
      break;
    case `Most commented`:
      sortingMethod = getCatalogSortedByComments;
      selectionValidationMethod = hasMostCommentedFilmComments;
      break;
  }

  const sortedCatalog = sortingMethod(films);

  // Здесь при любой выборке проверяем первый (топовый) элемент. Если топовый элемент не обладает свойством (рэйтинг или комменты), то и другие тоже
  if (!selectionValidationMethod(sortedCatalog[0])) {
    return null;
  }

  return pickEnough(sortedCatalog);
};

const getSelections = (films) => {
  return SelectionSettings.SELECTION_TITLES.map((selectionTitle) => {
    return {
      title: selectionTitle,
      films: selectFilms(selectionTitle, films)
    };
  });
};

export {getSelections};
