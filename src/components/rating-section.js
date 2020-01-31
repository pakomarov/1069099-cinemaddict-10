import {createElement, createRange} from '../utils.js';
import {RatingScoreSettings} from '../const.js';

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
  const scorePointsRange = createRange(RatingScoreSettings.SCORE_MIN, RatingScoreSettings.SCORE_MAX);
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

const createRatingSectionTemplate = (film) => {
  const {filmInfo: {poster, title}} = film;
  const ratingScoreMarkup = createRatingScoreMarkup(film);
  return setupRatingSectionTemplate(poster, title, ratingScoreMarkup);
};

export default class RatingSection {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createRatingSectionTemplate(this._film);
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
