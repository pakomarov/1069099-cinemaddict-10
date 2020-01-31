import {SiteMenuSettings} from '../const.js';

const getFilterCount = (filterTitle, catalog) => {
  let count = 0;

  switch (filterTitle) {
    case `All movies`:
      count = null;
      break;
    case `Watchlist`:
      for (const film of catalog) {
        count += film.userDetails.watchlist ? 1 : 0;
      }
      break;
    case `History`:
      for (const film of catalog) {
        count += film.userDetails.alreadyWatched ? 1 : 0;
      }
      break;
    case `Favorites`:
      for (const film of catalog) {
        count += film.userDetails.favorite ? 1 : 0;
      }
      break;
  }

  return count;
};

const getFilters = (catalog) => {
  return SiteMenuSettings.FILTER_TITLES.map((filterTitle) => {
    return {
      title: filterTitle,
      count: getFilterCount(filterTitle, catalog)
    };
  });
};

export {getFilters};
