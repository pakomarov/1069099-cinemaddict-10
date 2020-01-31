import {createElement, formatRuntime} from '../utils.js';
import {FilmSettings} from '../const.js';

const formatDescription = (description) => description.length > FilmSettings.DESCRIPTION_MAX_LENGTH ? `${description.substring(0, FilmSettings.DESCRIPTION_MAX_LENGTH)}...` : description;

const setupFilmTemplate = (Settings) => {
  const {
    title,
    totalRating,
    releaseYear,
    runtimeFormated,
    genreText,
    poster,
    descriptionFormated,
    commentCount,
    watchlistClass,
    alreadyWatchedClass,
    favoriteClass
  } = Settings;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${runtimeFormated}</span>
      <span class="film-card__genre">${genreText}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionFormated}</p>
    <a class="film-card__comments">${commentCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClass}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClass}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
    </form>
  </article>`;
};

const createFilmTemplate = (film) => {
  const {
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
  } = film;

  const TemplateSettings = {
    title,
    totalRating,
    poster,
    releaseYear: (new Date(date)).getFullYear(),
    runtimeFormated: formatRuntime(runtime),
    genreText: genre.join(`, `),
    descriptionFormated: formatDescription(description),
    commentCount: comments.length,
    watchlistClass: isInWacthlist ? FilmSettings.CLASS_CONTROL_ACTIVE : ``,
    alreadyWatchedClass: wasAlreadyWatched ? FilmSettings.CLASS_CONTROL_ACTIVE : ``,
    favoriteClass: isFavorite ? FilmSettings.CLASS_CONTROL_ACTIVE : ``
  };

  return setupFilmTemplate(TemplateSettings);
};

export default class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
