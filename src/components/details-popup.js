import {createElement, joinMapped, formatReleaseDate, formatRuntime, createRange, formatCommentDate} from '../utils';
import {CONTROLS, PersonalRating, EMOTIONS} from '../const.js';

const setupAlternativeTitleTemplate = (alternativeTitle) => {
  return `<p class="film-details__title-original">Original: ${alternativeTitle}</p>`;
};

const createAlternativeTitleMarkup = ({filmInfo: {alternativeTitle}}) => {
  const hasAlternativeTitle = !!alternativeTitle;
  return hasAlternativeTitle ? setupAlternativeTitleTemplate(alternativeTitle) : ``;
};

const setupPersonalRatingTemplate = (personalRating) => {
  return `<p class="film-details__user-rating">Your rate ${personalRating}</p>`;
};

const createPersonalRatingMarkup = ({userDetails: {personalRating}}) => {
  const hasPersonalRating = !!personalRating;
  return hasPersonalRating ? setupPersonalRatingTemplate(personalRating) : ``;
};

const setupGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const setupGenresTemplate = (descriptionCategoryName, genreListMarkup) => {
  return `<td class="film-details__term">${descriptionCategoryName}</td>
  <td class="film-details__cell">
    ${genreListMarkup}
  </td>`;
};

const createGenresMarkup = (genres) => {
  const descriptionCategoryName = genres.length < 2 ? `Genre` : `Genres`;
  const genreListMarkup = joinMapped(genres, setupGenreTemplate, `\n`);
  return setupGenresTemplate(descriptionCategoryName, genreListMarkup);
};

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

const setupControlTemplate = (title, text, checkedAttribute) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${title}" name="${title}" ${checkedAttribute}>
  <label for="${title}" class="film-details__control-label film-details__control-label--${title}">${text}</label>`;
};

const createControlMarkup = ({title, text, checkedAttribute}) => {
  return setupControlTemplate(title, text, checkedAttribute);
};

const createControlsMarkup = (film) => {
  const controls = getControls(film);
  return joinMapped(controls, createControlMarkup, `\n`);
};

const setupInfoSectionTemplate = (Settings, EmbeddedMarkup) => {
  const {
    poster,
    ageRating,
    title,
    totalRating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    releaseCountry,
    description
  } = Settings;
  const {
    alternativeTitleMarkup,
    personalRatingMarkup,
    genresMarkup,
    controlsMarkup
  } = EmbeddedMarkup;

  return `<div class="form-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            ${alternativeTitleMarkup}
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
            ${personalRatingMarkup}
          </div>
        </div>

          <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${releaseDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${runtime}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            ${genresMarkup}
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      ${controlsMarkup}
    </section>
  </div>`;
};

const createInfoSectionMarkup = (film) => {
  const {
    filmInfo: {
      poster,
      ageRating,
      title,
      totalRating,
      director,
      release: {
        releaseCountry,
        date: releaseDate
      },
      writers,
      actors,
      runtime,
      genre: genres,
      description,
    }
  } = film;

  const TemplateSettings = {
    poster,
    ageRating,
    title,
    totalRating,
    director,
    writers: writers.join(`, `),
    actors: actors.join(`, `),
    releaseDate: formatReleaseDate(new Date(releaseDate)),
    runtime: formatRuntime(runtime),
    releaseCountry,
    description
  };
  const EmbeddedMarkup = {
    alternativeTitleMarkup: createAlternativeTitleMarkup(film),
    personalRatingMarkup: createPersonalRatingMarkup(film),
    genresMarkup: createGenresMarkup(genres),
    controlsMarkup: createControlsMarkup(film)
  };

  return setupInfoSectionTemplate(TemplateSettings, EmbeddedMarkup);
};


const setupScorePointsTemplate = (scorePoints, checkedAttribute) => {
  return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${scorePoints}" id="rating-${scorePoints}" ${checkedAttribute}>
  <label class="film-details__user-rating-label" for="rating-${scorePoints}">${scorePoints}</label>`;
};

const createScorePointsMarkup = (scorePoints, isChecked) => {
  const checkedAttribute = isChecked ? `checked` : ``;
  return setupScorePointsTemplate(scorePoints, checkedAttribute);
};

const setupRatingScoreTemplate = (scorePointsRangeMarkup) => {
  return `<div class="film-details__user-rating-score">
    ${scorePointsRangeMarkup}
  </div>`;
};

const createRatingScoreMarkup = ({userDetails: {personalRating}}) => {
  const scorePointsRange = createRange(PersonalRating.SCORE_MIN, PersonalRating.SCORE_MAX);
  const scorePointsRangeMarkup = scorePointsRange.map((scorePoints) => {
    const isChecked = scorePoints === personalRating;
    return createScorePointsMarkup(scorePoints, isChecked);
  })
  .join(`\n`);
  return setupRatingScoreTemplate(scorePointsRangeMarkup);
};

const setupRatingSectionTemplate = (poster, title, ratingScoreMarkup) => {
  return `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          ${ratingScoreMarkup}
        </section>
      </div>
    </section>
  </div>`;
};

const createRatingSectionMarkup = (film) => {
  const {filmInfo: {poster, title}} = film;
  const ratingScoreMarkup = createRatingScoreMarkup(film);
  return setupRatingSectionTemplate(poster, title, ratingScoreMarkup);
};


const setupDetailsPopupTemplate = (infoSectionMarkup, ratingSectionMarkup, commentSectionMarkup) => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      ${infoSectionMarkup}
      ${ratingSectionMarkup}
      ${commentSectionMarkup}
    </form>
  </section>`;
};

const setupCommentTemplate = (emotion, commentText, author, commentDate) => {
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createCommentMarkup = ({emotion, comment: commentText, author, date: commentDate}) => {
  const formattedCommentDate = formatCommentDate(commentDate);
  return setupCommentTemplate(emotion, commentText, author, formattedCommentDate);
};

const createCommentListMarkup = (comments) => joinMapped(comments, createCommentMarkup, `\n`);

const setupCommentsTemplate = (commentListMarkup) => {
  return `<ul class="film-details__comments-list">
    ${commentListMarkup}
  </ul>`;
};

const createCommentsMarkup = (comments) => {
  const commentListMarkup = createCommentListMarkup(comments);
  return setupCommentsTemplate(commentListMarkup);
};

const setupEmojiTemplate = (emotion) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`;
};

const createEmojiListMarkup = () => joinMapped(EMOTIONS, setupEmojiTemplate, `\n`);

const setupNewCommentTemplate = (emojiListMarkup) => {
  return `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      ${emojiListMarkup}
    </div>
  </div>`;
};

const createNewCommentMarkup = () => {
  const emojiListMarkup = createEmojiListMarkup();
  return setupNewCommentTemplate(emojiListMarkup);
};

const setupCommentSectionTemplate = (commentCount, commentsMarkup, newCommentMarkup) => {
  return `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
      ${commentsMarkup}

      ${newCommentMarkup}
    </section>
  </div>`;
};

const createCommentSectionMarkup = (film) => {
  const {comments} = film;
  const commentCount = comments.length;
  const commentsMarkup = createCommentsMarkup(comments);
  const newCommentMarkup = createNewCommentMarkup();

  return setupCommentSectionTemplate(commentCount, commentsMarkup, newCommentMarkup);
};


const createDetailsPopupTemplate = (film) => {
  const infoSectionMarkup = createInfoSectionMarkup(film);
  const ratingSectionMarkup = !film.userDetails.alreadyWatched ? `` : createRatingSectionMarkup(film);
  const commentSectionMarkup = createCommentSectionMarkup(film);
  return setupDetailsPopupTemplate(infoSectionMarkup, ratingSectionMarkup, commentSectionMarkup);
};

export default class DetailsPopup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createDetailsPopupTemplate(this._film);
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
