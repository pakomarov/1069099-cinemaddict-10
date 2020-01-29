import {createInfoTableMarkup} from './info-table.js';

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

const setupInfoSectionTemplate = (poster, ageRating, title, alternativeTitleMarkup, totalRating, personalRatingMarkup, infoTableMarkup, description) => {
  return `<div class="film-details__info-wrap">
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

      ${infoTableMarkup}

      <p class="film-details__film-description">
        ${description}
      </p>
    </div>
  </div>`;
};

const createInfoSectionMarkup = (film) => {
  const {
    filmInfo: {
      poster,
      ageRating,
      title,
      totalRating,
      description
    }
  } = film;
  const alternativeTitleMarkup = createAlternativeTitleMarkup(film);
  const personalRatingMarkup = createPersonalRatingMarkup(film);
  const infoTableMarkup = createInfoTableMarkup(film);
  return setupInfoSectionTemplate(poster, ageRating, title, alternativeTitleMarkup, totalRating, personalRatingMarkup, infoTableMarkup, description);
};

export {createInfoSectionMarkup};
