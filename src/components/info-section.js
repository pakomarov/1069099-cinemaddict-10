import {joinMapped, formatReleaseDate, formatRuntime} from '../utils';

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
    genresMarkup
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
    genresMarkup: createGenresMarkup(genres)
  };

  return setupInfoSectionTemplate(TemplateSettings, EmbeddedMarkup);
};

export {createInfoSectionMarkup};
