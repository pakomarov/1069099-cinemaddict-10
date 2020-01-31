import {render, joinMapped} from './utils.js';
import {generateCatalog} from './mocks/catalog.js';
import {getProfileRank} from './mocks/profile.js';
import {createProfileMarkup} from './components/profile.js';
import {getFilters} from './mocks/site-menu.js';
import {createSiteMenuMarkup} from './components/site-menu.js';
import {createSortMarkup} from './components/sort.js';
import {createContentMarkup} from './components/content.js';
import {ShowSettings} from './const.js';
import {createFilmMarkup} from './components/film.js';
import {createShowMoreButtonMarkup} from './components/show-more-button.js';
import {getSelections} from './mocks/selections.js';
import {createSelectionMarkup} from './components/selection.js';
import {createBriefStatsMarkup} from './components/brief-stats.js';
import {createFilmDetailsMarkup} from './components/film-details.js';
import {createInfoSectionMarkup} from './components/info-section.js';
import {getControls} from './mocks/controls.js';
import {createControlsMarkup} from './components/control-section.js';
import {createRatingSectionMarkup} from './components/rating-section.js';
import {createCommentSectionMarkup} from './components/comment-section.js';

const FILM_COUNT = 17;
const OPENED_FILM_INDEX = 0;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const catalog = generateCatalog(FILM_COUNT);

const renderFilmDetails = (container, film, place) => {
  render(container, createFilmDetailsMarkup(film), place);
  const filmDetailsElement = document.querySelector(`.film-details__inner`);
  render(filmDetailsElement, createInfoSectionMarkup(film), `beforeend`);
  const infoSectionContainerElement = filmDetailsElement.querySelector(`.form-details__top-container`);
  const controls = getControls(film);
  render(infoSectionContainerElement, createControlsMarkup(controls), `beforeend`);
  if (film.userDetails.alreadyWatched) {
    render(filmDetailsElement, createRatingSectionMarkup(film), `beforeend`);
  }
  render(filmDetailsElement, createCommentSectionMarkup(film), `beforeend`);
};

const renderSiteComponents = () => {
  const profileRank = getProfileRank(catalog);
  render(siteHeaderElement, createProfileMarkup(profileRank), `beforeend`);

  const filters = getFilters(catalog);
  render(siteMainElement, createSiteMenuMarkup(filters), `beforeend`);

  render(siteMainElement, createSortMarkup(), `beforeend`);

  render(siteMainElement, createContentMarkup(), `beforeend`);

  const contentElement = siteMainElement.querySelector(`.films`);
  const filmsContainerElement = contentElement.querySelector(`.films-list__container`);

  let showedFilmsCount = ShowSettings.FILM_COUNT_ON_START;
  catalog.slice(0, showedFilmsCount)
    .forEach((film) => {
      render(filmsContainerElement, createFilmMarkup(film), `beforeend`);
    });

  render(filmsContainerElement, createShowMoreButtonMarkup(), `afterend`);

  const showMoreButton = contentElement.querySelector(`.films-list__show-more`);
  const renderMoreFilms = () => {
    const previouslyShowedFilmsCount = showedFilmsCount;
    showedFilmsCount = showedFilmsCount + ShowSettings.FILM_COUNT_BY_BUTTON;

    const additionalFilms = catalog.slice(previouslyShowedFilmsCount, showedFilmsCount);
    const additionalFilmsMarkup = joinMapped(additionalFilms, createFilmMarkup, `\n`);
    render(filmsContainerElement, additionalFilmsMarkup, `beforeend`);
  };
  const showMoreButtonClickHandler = () => {
    renderMoreFilms();
    if (showedFilmsCount >= catalog.length) {
      showMoreButton.removeEventListener(`click`, showMoreButtonClickHandler);
      showMoreButton.remove();
    }
  };
  showMoreButton.addEventListener(`click`, showMoreButtonClickHandler);

  const selections = getSelections(catalog);
  selections.forEach((selection) => {
    render(contentElement, createSelectionMarkup(selection), `beforeend`);
  });

  render(siteFooterElement, createBriefStatsMarkup(catalog), `beforeend`);

  const openedFilm = catalog[OPENED_FILM_INDEX];
  renderFilmDetails(siteFooterElement, openedFilm, `afterend`);
};

renderSiteComponents();
