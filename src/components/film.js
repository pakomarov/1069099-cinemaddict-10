const DESCRIPTION_MAX_LENGTH = 140;
const CLASS_CONTROL_ACTIVE = `film-card__controls-item--active`;

const formatRuntime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatDescription = (description) => description.length > DESCRIPTION_MAX_LENGTH ? `${description.substring(0, DESCRIPTION_MAX_LENGTH)}...` : description;

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
    watchlist,
    alreadyWatched,
    favorite
  }
}) => {
  const releaseYear = (new Date(date)).getFullYear();
  const runtimeFormated = formatRuntime(runtime);
  const genreText = genre.join(`, `);
  const descriptionFormated = formatDescription(description);
  const commentCount = comments.length;
  const watchlistClass = watchlist ? CLASS_CONTROL_ACTIVE : ``;
  const alreadyWatchedClass = alreadyWatched ? CLASS_CONTROL_ACTIVE : ``;
  const favoriteClass = favorite ? CLASS_CONTROL_ACTIVE : ``;

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

export {createFilmMarkup};
