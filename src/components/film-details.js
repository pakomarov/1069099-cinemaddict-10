import {joinMapped, formatReleaseDate, formatRuntime, formatCommentDate} from '../utils.js';
import {ATTRIBUTE_CHECKED, EMOTIONS} from '../const.js';

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

const setupInfoMarkup = (Settings, EmbeddedMarkup) => {
  return `<div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${Settings.poster}" alt="">

      <p class="film-details__age">${Settings.ageRating}+</p>
    </div>

    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${Settings.title}</h3>
          <p class="film-details__title-original">Original: ${Settings.alternativeTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${Settings.totalRating}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${Settings.director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${Settings.writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${Settings.actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${Settings.releaseDate}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${Settings.runtime}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${Settings.releaseCountry}</td>
        </tr>
        <tr class="film-details__row">
          ${EmbeddedMarkup.genresMarkup}
        </tr>
      </table>

      <p class="film-details__film-description">
        ${Settings.description}
      </p>
    </div>
  </div>`;
};

const createInfoMarkup = ({
  filmInfo: {
    poster,
    ageRating,
    title,
    alternativeTitle,
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
    description
  }
}) => {
  const TemplateSettings = {
    poster,
    ageRating,
    title,
    alternativeTitle,
    totalRating,
    director,
    releaseCountry,
    description
  };
  const EmbeddedMarkup = {};

  TemplateSettings.writers = writers.join(`, `);
  TemplateSettings.actors = actors.join(`, `);
  TemplateSettings.releaseDate = formatReleaseDate(new Date(releaseDate));
  TemplateSettings.runtime = formatRuntime(runtime);

  EmbeddedMarkup.genresMarkup = createGenresMarkup(genres);

  return setupInfoMarkup(TemplateSettings, EmbeddedMarkup);
};

const setupControlsTemplate = (watchlistCheckedAttribute, alreadyWatchedCheckedAttribute, favoriteCheckedAttribute) => {
  return `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistCheckedAttribute}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatchedCheckedAttribute}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteCheckedAttribute}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>`;
};

const createControlsMarkup = ({
  userDetails: {
    watchlist: isInWatchlist,
    alreadyWatched: wasAlreadyWatched,
    favorite: isFavorite
  }
}) => {
  const watchlistCheckedAttribute = isInWatchlist ? ATTRIBUTE_CHECKED : ``;
  const alreadyWatchedCheckedAttribute = wasAlreadyWatched ? ATTRIBUTE_CHECKED : ``;
  const favoriteCheckedAttribute = isFavorite ? ATTRIBUTE_CHECKED : ``;

  return setupControlsTemplate(watchlistCheckedAttribute, alreadyWatchedCheckedAttribute, favoriteCheckedAttribute);
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

const setupNewCommentFormTemplate = (emojiListMarkup) => {
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

const createNewCommentFormMarkup = () => {
  const emojiListMarkup = createEmojiListMarkup();

  return setupNewCommentFormTemplate(emojiListMarkup);
};

const setupCommentSectionTemplate = (commentCount, commentsMarkup, newCommentFormMarkup) => {
  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
    ${commentsMarkup}

    ${newCommentFormMarkup}
  </section>`;
};

const createCommentSectionMarkup = ({comments}) => {
  const commentCount = comments.length;
  const commentsMarkup = createCommentsMarkup(comments);
  const newCommentFormMarkup = createNewCommentFormMarkup();

  return setupCommentSectionTemplate(commentCount, commentsMarkup, newCommentFormMarkup);
};

const setupFilmDetailsTemplate = (EmbeddedMarkup) => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>

        ${EmbeddedMarkup.info}

        ${EmbeddedMarkup.controls}
      </div>

      <div class="form-details__bottom-container">
        ${EmbeddedMarkup.commentSection}
      </div>
    </form>
  </section>`;
};

const createFilmDetailsMarkup = (film) => {
  const EmbeddedMarkup = {};

  EmbeddedMarkup.info = createInfoMarkup(film);
  EmbeddedMarkup.controls = createControlsMarkup(film);
  EmbeddedMarkup.commentSection = createCommentSectionMarkup(film);

  return setupFilmDetailsTemplate(EmbeddedMarkup);
};

export {createFilmDetailsMarkup};
