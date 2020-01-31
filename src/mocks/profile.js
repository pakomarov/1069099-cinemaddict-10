import {PROFILE_RANKS} from '../const.js';

const countWacthedFilms = (catalog) => {
  return catalog.reduce((watchedCount, film) => {
    return watchedCount + film.userDetails.alreadyWatched ? 1 : 0;
  }, 0);
};

const convertWacthedCountToTitle = (watchedCount) => PROFILE_RANKS.find((rank) => watchedCount <= rank.borderCount).title;

const getProfileRank = (catalog) => {
  const watchedCount = countWacthedFilms(catalog);
  return convertWacthedCountToTitle(watchedCount);
};

export {getProfileRank};
