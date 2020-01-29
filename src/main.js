import {render} from './utils.js';
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

const FILM_COUNT = 15;

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

const renderContent = (container) => {
  const contentMarkup = createContentMarkup(catalog);
  render(container, contentMarkup, `beforeend`);
};

const renderBriefStats = (container) => {
  const briefStatsMarkup = createBriefStatsMarkup(catalog);
  render(container, briefStatsMarkup, `beforeend`);
};

const renderFilmDetails = (container) => {
  const filmDetailsMarkup = createFilmDetailsMarkup(catalog[SiteSettings.indexOfOpenedFilm]);
  render(container, filmDetailsMarkup, `afterend`);
};

const renderSiteComponenets = () => {
  renderProfile(siteHeaderElement);
  renderSiteMenu(siteMainElement);
  renderSort(siteMainElement);
  renderContent(siteMainElement);
  renderBriefStats(siteFooterElement);
  renderFilmDetails(siteFooterElement);
};

renderSiteComponenets();
