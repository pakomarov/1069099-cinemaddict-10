import {PROFILE_RANKS} from '../const.js';

const countWacthedFilms = (catalog) => {
  let watchedCounter = 0;
  for (const film of catalog) {
    watchedCounter += film.userDetails.alreadyWatched ? 1 : 0;
  }
  return watchedCounter;
};

const convertWacthedCountToRank = (watchedCount) => PROFILE_RANKS.find((rank) => watchedCount <= rank.borderCount).rank;

const getProfileRank = (catalog) => {
  const watchedCount = countWacthedFilms(catalog);
  return convertWacthedCountToRank(watchedCount);
};

export {getProfileRank};
