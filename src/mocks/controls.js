import {CONTROLS} from '../const.js';

const getCheckedAttribute = (title, {
  userDetails: {
    watchlist: isInWatchlist,
    alreadyWatched: wasAlreadyWatched,
    favorite: isFavorite
  }
}) => {
  let isChecked;

  switch (title) {
    case `watchlist`:
      isChecked = isInWatchlist;
      break;
    case `watched`:
      isChecked = wasAlreadyWatched;
      break;
    case `favorite`:
      isChecked = isFavorite;
      break;
  }

  return isChecked ? `checked` : ``;
};

const getControls = (film) => {
  return CONTROLS.map(({title, text}) => {
    return {
      title,
      text,
      checkedAttribute: getCheckedAttribute(title, film)
    };
  });
};

export {getControls};
