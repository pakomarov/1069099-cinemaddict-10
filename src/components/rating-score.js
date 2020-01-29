import {createRange} from '../utils.js';
import {RatingScoreSettings} from '../const.js';

const setupScorePointsTemplate = (scorePoints, checkedAttribute) => {
  return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${scorePoints}" id="rating-${scorePoints}" ${checkedAttribute}>
  <label class="film-details__user-rating-label" for="rating-${scorePoints}">${scorePoints}</label>`;
};

const createScorePointsMarkup = (scorePoints, isChecked) => {
  const checkedAttribute = isChecked ? RatingScoreSettings.ATTRIBUTE_CHECKED : RatingScoreSettings.ATTRIBUTE_NON_CHECKED;
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

export {createRatingScoreMarkup};
