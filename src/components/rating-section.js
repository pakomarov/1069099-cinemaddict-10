import {createRatingScoreMarkup} from './rating-score.js';

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

export {createRatingSectionMarkup};
