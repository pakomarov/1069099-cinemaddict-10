import {createTemplateElement, render} from './utils.js';
import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsListsContainerTemplate} from './components/films-lists-container.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra.js';
import {createFilmMarkup} from './components/film.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {generateFilms} from './mocks/film.js';

const FILM_COUNT = 5;
// const FILM_EXTRA_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);

const renderHeader = () => {
  render(siteHeaderElement, createProfileTemplate(), `beforeend`);
};

const renderMain = () => {
  const fragment = document.createDocumentFragment();

  const siteMenuTemplateElement = createTemplateElement(createSiteMenuTemplate());
  fragment.appendChild(siteMenuTemplateElement.content);

  const sortTemplateElement = createTemplateElement(createSortTemplate());
  fragment.appendChild(sortTemplateElement.content);

  const filmsListsContainerTemplateElement = createTemplateElement(createFilmsListsContainerTemplate());
  fragment.appendChild(filmsListsContainerTemplateElement.content);

  const filmsListsContainerElement = fragment.querySelector(`.films`);
  render(filmsListsContainerElement, createFilmsListTemplate(), `beforeend`);
  render(filmsListsContainerElement, createFilmsListExtraTemplate(), `beforeend`);
  render(filmsListsContainerElement, createFilmsListExtraTemplate(), `beforeend`);

  const filmsListElement = filmsListsContainerElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  films.forEach((film) => render(filmsListContainerElement, createFilmMarkup(film), `beforeend`));

  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  // const filmsListExtraContainerElements = filmsListsContainerElement.querySelectorAll(`.films-list--extra .films-list__container`);
  // filmsListExtraContainerElements.forEach(
  //     (element) => {
  //       for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  //         render(element, createFilmTemplate(), `beforeend`);
  //       }
  //     }
  // );

  siteMainElement.appendChild(fragment);
};

const renderDetailsPopup = () => {
  render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
};

const renderSiteComponents = () => {
  renderHeader();
  renderMain();
  // renderDetailsPopup();
};

renderSiteComponents();
