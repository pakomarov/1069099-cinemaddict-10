import {PROFILE_RANKS} from '../const.js';

const countWacthedFilms = (films) => {
  return films.reduce((watchedCount, film) => {
    return watchedCount + (film.userDetails.alreadyWatched ? 1 : 0);
  }, 0);
};

const convertWacthedCountToTitle = (watchedCount) => PROFILE_RANKS.find((rank) => watchedCount <= rank.borderCount).title;

const getProfileRank = (allFilms) => {
  const watchedCount = countWacthedFilms(allFilms);
  return convertWacthedCountToTitle(watchedCount);
};

export {getProfileRank};
