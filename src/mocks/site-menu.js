import {SiteMenuSettings} from '../const.js';

const titleToPropertyName = {
  'Watchlist': `watchlist`,
  'History': `alreadyWatched`,
  'Favorites': `favorite`
};

const getFilterCount = (filterTitle, catalog) => {
  return catalog.reduce((count, film) => {
    return count + film.userDetails[titleToPropertyName[filterTitle]] ? 1 : 0;
  }, 0);
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
