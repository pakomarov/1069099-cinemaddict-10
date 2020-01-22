import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortTemplate} from './components/sort.js';
import {createContentContainerTemplate} from './components/content-container.js';
import {createFilmListTemplate} from './components/film-list.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmListExtraTemplate} from './components/film-list-extra.js';
import {createFilmTemplate} from './components/film.js';
import {createDetailsTemplate} from './components/details.js';

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const createTemplateElement = (template) => {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;
  return templateElement;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderHeader = () => {
  render(siteHeaderElement, createProfileTemplate(), `beforeend`);
};

const renderMain = () => {
  const fragment = document.createDocumentFragment();

  const siteMenuTemplateElement = createTemplateElement(createSiteMenuTemplate());
  fragment.appendChild(siteMenuTemplateElement.content);

  const sortTemplateElement = createTemplateElement(createSortTemplate());
  fragment.appendChild(sortTemplateElement.content);

  const contentContainerTemplateElement = createTemplateElement(createContentContainerTemplate());
  fragment.appendChild(contentContainerTemplateElement.content);

  const contentContainerElement = fragment.querySelector(`.films`);
  render(contentContainerElement, createFilmListTemplate(), `beforeend`);
  render(contentContainerElement, createFilmListExtraTemplate(), `beforeend`);
  render(contentContainerElement, createFilmListExtraTemplate(), `beforeend`);

  const filmsListElement = contentContainerElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  for (let i = 0; i < FILM_COUNT; i++) {
    render(filmsListContainerElement, createFilmTemplate(), `beforeend`);
  }
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  const filmsListExtraContainerElements = contentContainerElement.querySelectorAll(`.films-list--extra .films-list__container`);
  filmsListExtraContainerElements.forEach(
      (element) => {
        for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
          render(element, createFilmTemplate(), `beforeend`);
        }
      }
  );

  siteMainElement.appendChild(fragment);
};

const renderDetailsPopup = () => {
  render(siteFooterElement, createDetailsTemplate(), `afterend`);
};

const renderSiteComponents = () => {
  renderHeader();
  renderMain();
  renderDetailsPopup();
};

renderSiteComponents();
