import {ProfileRank} from '../const.js';

const countWacthedFilms = (films) => {
  let watchedCounter = 0;
  for (const film of films) {
    watchedCounter += film.userDetails.alreadyWatched ? 1 : 0;
  }
  return watchedCounter;
};

const convertWacthedCountToRank = (watchedCount) => ProfileRank.find((rank) => watchedCount <= rank.borderCount).rank;

const getProfileRank = (films) => {
  const watchedCount = countWacthedFilms(films);
  return convertWacthedCountToRank(watchedCount);
};

export {getProfileRank};
