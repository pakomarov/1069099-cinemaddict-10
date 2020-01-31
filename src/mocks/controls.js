import {CONTROLS} from '../const.js';

const titleToPropertyName = {
  'watchlist': `watchlist`,
  'watched': `alreadyWatched`,
  'favorite': `favorite`
};

const getControls = (film) => {
  return CONTROLS.map((control) => {
    const {title, text} = control;
    return {
      title,
      text,
      checkedAttribute: film.userDetails[titleToPropertyName[title]] ? `checked` : ``
    };
  });
};

export {getControls};
