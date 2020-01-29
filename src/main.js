import {render, joinMapped} from './utils.js';
import {generateCatalog} from './mocks/catalog.js';
import {setupSiteSettings} from './mocks/site-settings.js';
import {getProfileRank} from './mocks/profile.js';
import {createProfileMarkup} from './components/profile.js';
import {getFilters} from './mocks/site-menu.js';
import {createSiteMenuMarkup} from './components/site-menu.js';
import {getSortButtons} from './mocks/sort.js';
import {createSortMarkup} from './components/sort.js';
import {createContentMarkup} from './components/content.js';
import {createBriefStatsMarkup} from './components/brief-stats.js';
import {createFilmDetailsMarkup} from './components/film-details.js';
import {ShowSettings} from './const.js';
import {createFilmMarkup} from './components/film.js';

const FILM_COUNT = 17;
const OPENED_FILM_INDEX = 0;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const catalog = generateCatalog(FILM_COUNT);
const SiteSettings = setupSiteSettings();

const renderProfile = (container) => {
  const profileRank = getProfileRank(catalog);
  const profileMarkup = createProfileMarkup(profileRank);
  render(container, profileMarkup, `beforeend`);
};

const renderSiteMenu = (container) => {
  const filters = getFilters(catalog, SiteSettings);
  const siteMenuMarkup = createSiteMenuMarkup(filters);
  render(container, siteMenuMarkup, `beforeend`);
};

const renderSort = (container) => {
  const sortButtons = getSortButtons(SiteSettings);
  const sortMarkup = createSortMarkup(sortButtons);
  render(container, sortMarkup, `beforeend`);
};

const renderContent = (films, container) => {
  const contentMarkup = createContentMarkup(films);
  render(container, contentMarkup, `beforeend`);
};

const renderBriefStats = (container) => {
  const briefStatsMarkup = createBriefStatsMarkup(catalog);
  render(container, briefStatsMarkup, `beforeend`);
};

const renderFilmDetails = (film, container) => {
  if (!film) {
    return;
  }

  const filmDetailsMarkup = createFilmDetailsMarkup(film);
  render(container, filmDetailsMarkup, `afterend`);
};

let showedFilmsCount = ShowSettings.FILM_COUNT_ON_START;

const renderSiteComponenets = () => {
  renderProfile(siteHeaderElement);
  renderSiteMenu(siteMainElement);
  renderSort(siteMainElement);
  renderContent(catalog.slice(0, showedFilmsCount), siteMainElement);
  renderBriefStats(siteFooterElement);
  renderFilmDetails(catalog[OPENED_FILM_INDEX], siteFooterElement);
};

renderSiteComponenets();

const filmsListContainerElement = siteMainElement.querySelector(`.films-list__container`);
const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

const renderMoreFilms = () => {
  const previouslyShowedFilmsCount = showedFilmsCount;
  showedFilmsCount = showedFilmsCount + ShowSettings.FILM_COUNT_BY_BUTTON;

  const additionalFilms = catalog.slice(previouslyShowedFilmsCount, showedFilmsCount);
  const additionalFilmsMarkup = joinMapped(additionalFilms, createFilmMarkup, `\n`);
  render(filmsListContainerElement, additionalFilmsMarkup, `beforeend`);
};

const showMoreButtonClickHandler = () => {
  renderMoreFilms();
  if (showedFilmsCount >= catalog.length) {
    showMoreButton.removeEventListener(`click`, showMoreButtonClickHandler);
    showMoreButton.remove();
  }
};

if (showMoreButton) {
  showMoreButton.addEventListener(`click`, showMoreButtonClickHandler);
}
