import {SiteMenuSettings} from '../const.js';

const titleToPropertyName = {
  'Watchlist': `watchlist`,
  'History': `alreadyWatched`,
  'Favorites': `favorite`
};

const getFilterCount = (filterTitle, films) => {
  return films.reduce((count, film) => {
    return count + (film.userDetails[titleToPropertyName[filterTitle]] ? 1 : 0);
  }, 0);
};

const getFilters = (films) => {
  return SiteMenuSettings.FILTER_TITLES.map((filterTitle) => {
    return {
      title: filterTitle,
      count: getFilterCount(filterTitle, films)
    };
  });
};

export {getFilters};
