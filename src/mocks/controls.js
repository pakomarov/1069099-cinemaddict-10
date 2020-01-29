import {ControlsSettings} from '../const.js';

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

  return isChecked ? ControlsSettings.ATTRIBUTE_CHECKED : ControlsSettings.ATTRIBUTE_NON_CHECKED;
};

const getControls = (film) => {
  return ControlsSettings.CONTROLS.map(({title, text}) => {
    return {
      title,
      text,
      checkedAttribute: getCheckedAttribute(title, film)
    };
  });
};

export {getControls};
