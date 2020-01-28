const FILTER_TITLES = [
  `All movies`,
  `Wacthlist`,
  `History`,
  `Favorites`
];

const getFilterCount = (films, filterTitle) => {
  let count = 0;

  switch (filterTitle) {
    case `All movies`:
      count = films.length;
      break;
    case `Watchlist`:
      for (const film of films) {
        count += film.userDetails.watchlist ? 1 : 0;
      }
      break;
    case `History`:
      for (const film of films) {
        count += film.userDetails.alreadyWatched ? 1 : 0;
      }
      break;
    case `Favorites`:
      for (const film of films) {
        count += film.userDetails.favorite ? 1 : 0;
      }
      break;
  }

  return count;
};

const getFilters = (films) => {
  return FILTER_TITLES.map((filterTitle) => {
    return {
      title: filterTitle,
      count: getFilterCount(films, filterTitle)
    };
  });
};

export {getFilters};
