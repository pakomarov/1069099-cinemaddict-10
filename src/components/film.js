import {formatRuntime} from '../utils.js';
import {FilmSettings} from '../const.js';

const formatDescription = (description) => description.length > FilmSettings.DESCRIPTION_MAX_LENGTH ? `${description.substring(0, FilmSettings.DESCRIPTION_MAX_LENGTH)}...` : description;

const setupFilmTemplate = (Settings) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${Settings.title}</h3>
    <p class="film-card__rating">${Settings.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${Settings.releaseYear}</span>
      <span class="film-card__duration">${Settings.runtimeFormated}</span>
      <span class="film-card__genre">${Settings.genreText}</span>
    </p>
    <img src="${Settings.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${Settings.descriptionFormated}</p>
    <a class="film-card__comments">${Settings.commentCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${Settings.watchlistClass}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${Settings.alreadyWatchedClass}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${Settings.favoriteClass}">Mark as favorite</button>
    </form>
  </article>`;
};

const createFilmMarkup = ({
  comments,
  filmInfo: {
    title,
    totalRating,
    poster,
    release: {
      date
    },
    runtime,
    genre,
    description
  },
  userDetails: {
    watchlist: isInWacthlist,
    alreadyWatched: wasAlreadyWatched,
    favorite: isFavorite
  }
}) => {
  const TemplateSettings = {title, totalRating, poster};

  TemplateSettings.releaseYear = (new Date(date)).getFullYear();
  TemplateSettings.runtimeFormated = formatRuntime(runtime);
  TemplateSettings.genreText = genre.join(`, `);
  TemplateSettings.descriptionFormated = formatDescription(description);
  TemplateSettings.commentCount = comments.length;
  TemplateSettings.watchlistClass = isInWacthlist ? FilmSettings.CLASS_CONTROL_ACTIVE : FilmSettings.CLASS_CONTROL_NON_ACTIVE;
  TemplateSettings.alreadyWatchedClass = wasAlreadyWatched ? FilmSettings.CLASS_CONTROL_ACTIVE : FilmSettings.CLASS_CONTROL_NON_ACTIVE;
  TemplateSettings.favoriteClass = isFavorite ? FilmSettings.CLASS_CONTROL_ACTIVE : FilmSettings.CLASS_CONTROL_NON_ACTIVE;

  return setupFilmTemplate(TemplateSettings);
};

export {createFilmMarkup};
