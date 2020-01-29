import {SelectionSettings} from '../const.js';

const isCatalogEmpty = (catalog) => catalog.length === 0;

const getCatalogSortedByRating = (catalog) => catalog.slice()
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

const isTopRatedFilmRated = (topRatedFilm) => topRatedFilm.filmInfo.totalRating !== 0;

const getCatalogSortedByComments = (catalog) => catalog.slice()
  .sort((a, b) => b.comments.length - a.comments.length);

const hasMostCommentedFilmComments = (mostCommentedFilm) => mostCommentedFilm.comments.length > 0;

const pickEnough = (sortedCatalog) => sortedCatalog.slice(0, SelectionSettings.COUNT);

const selectFilms = (selectionTitle, catalog) => {
  if (isCatalogEmpty(catalog)) {
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

  const sortedCatalog = sortingMethod(catalog);

  // Здесь при любой выборке проверяем первый (топовый) элемент. Если топовый элемент не обладает свойством (рэйтинг или комменты), то и другие тоже
  if (!selectionValidationMethod(sortedCatalog[0])) {
    return null;
  }

  return pickEnough(sortedCatalog);
};

const getSelections = (catalog) => {
  return SelectionSettings.SELECTION_TITLES.map((selectionTitle) => {
    return {
      title: selectionTitle,
      selectedFilms: selectFilms(selectionTitle, catalog)
    };
  });
};

export {getSelections};
