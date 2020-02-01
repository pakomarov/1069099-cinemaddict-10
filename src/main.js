import {RenderPosition, render} from './utils.js';
import {generateFilms} from './mocks/film.js';
import {getProfileRank} from './mocks/profile.js';
import ProfileComponent from './components/profile.js';
import {getFilters} from './mocks/filters.js';
import SiteMenuComponent from './components/site-menu.js';
import SortComponent from './components/sort.js';
import ContentComponent from './components/content.js';
import CatalogComponent from './components/catalog.js';
import EmptyCatalogComponent from './components/empty-catalog.js';
import FilmListContainerComponent from './components/film-list-container.js';
import {ShowSettings} from './const.js';
import ShowMoreButtonComponent from './components/show-more-button';
import FilmComponent from './components/film.js';
import {getSelections} from './mocks/selections.js';
import SelectionComponent from './components/selection.js';
import {getCatalogSize} from './mocks/brief-stats.js';
import BriefStatsComponent from './components/brief-stats.js';
import DetailsPopupComponent from './components/details-popup.js';

const Selector = {
  BODY: `body`,
  HEADER: `.header`,
  MAIN: `.main`,
  FOOTER: `.footer`
};
const FILM_COUNT = 10;

const bodyElement = document.querySelector(Selector.BODY);
const siteHeaderElement = bodyElement.querySelector(Selector.HEADER);
const siteMainElement = bodyElement.querySelector(Selector.MAIN);
const siteFooterElement = bodyElement.querySelector(Selector.FOOTER);

const films = generateFilms(FILM_COUNT);

const renderFilm = (containerElement, film) => {
  const filmComponent = new FilmComponent(film);
  const posterElement = filmComponent.getElement().querySelector(`img`);
  const titleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const commentsElement = filmComponent.getElement().querySelector(`.film-card__comments`);

  const detailsPopupComponent = new DetailsPopupComponent(film);
  const closeButtonElement = detailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  const openDetailsPopup = () => {
    render(bodyElement, detailsPopupComponent.getElement(), RenderPosition.BEFOREEND);
  };
  const closeDetailsPopup = () => {
    detailsPopupComponent.getElement().remove();
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeDetailsPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  posterElement.addEventListener(`click`, () => {
    openDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  titleElement.addEventListener(`click`, () => {
    openDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  commentsElement.addEventListener(`click`, () => {
    openDetailsPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  closeButtonElement.addEventListener(`click`, closeDetailsPopup);

  render(containerElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderSelection = (containerElement, selection, place) => {
  const {title, films: selectedFilms} = selection;
  if (!selectedFilms) {
    return;
  }

  const selectionComponent = new SelectionComponent(title);

  const filmListContainer = new FilmListContainerComponent();
  render(selectionComponent.getElement(), filmListContainer.getElement(), RenderPosition.BEFOREEND);
  selectedFilms.forEach((film) => {
    renderFilm(filmListContainer.getElement(), film);
  });

  render(containerElement, selectionComponent.getElement(), place);
};

const renderSiteComponents = () => {
  const profileRank = getProfileRank(films);
  render(siteHeaderElement, new ProfileComponent(profileRank).getElement(), RenderPosition.BEFOREEND);

  const fragment = document.createDocumentFragment();

  const filters = getFilters(films);
  render(fragment, new SiteMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);

  render(fragment, new SortComponent().getElement(), RenderPosition.BEFOREEND);

  const contentComponent = new ContentComponent();
  render(fragment, contentComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(contentComponent.getElement(), new EmptyCatalogComponent().getElement(), RenderPosition.BEFOREEND);
  } else {
    const catalogComponent = new CatalogComponent();
    render(contentComponent.getElement(), catalogComponent.getElement(), RenderPosition.BEFOREEND);

    const catalogFilmListContainer = new FilmListContainerComponent();
    render(catalogComponent.getElement(), catalogFilmListContainer.getElement(), RenderPosition.BEFOREEND);

    let showedFilmsCount = ShowSettings.FILM_COUNT_ON_START;

    films.slice(0, showedFilmsCount)
      .forEach((film) => {
        renderFilm(catalogFilmListContainer.getElement(), film);
      });

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(catalogComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    const renderMoreFilms = () => {
      const previouslyShowedFilmsCount = showedFilmsCount;
      showedFilmsCount = showedFilmsCount + ShowSettings.FILM_COUNT_BY_BUTTON;

      films.slice(previouslyShowedFilmsCount, showedFilmsCount)
        .forEach((film) => {
          renderFilm(catalogFilmListContainer.getElement(), film);
        });
    };

    const showMoreButtonClickHandler = () => {
      renderMoreFilms();

      if (showedFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().removeEventListener(`click`, showMoreButtonClickHandler);
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    };

    showMoreButtonComponent.getElement().addEventListener(`click`, showMoreButtonClickHandler);
  }

  const selections = getSelections(films);
  selections.forEach((selection) => {
    renderSelection(contentComponent.getElement(), selection, RenderPosition.BEFOREEND);
  });

  render(siteMainElement, fragment, RenderPosition.BEFOREEND);

  const catalogSize = getCatalogSize(films);
  render(siteFooterElement, new BriefStatsComponent(catalogSize).getElement(), RenderPosition.BEFOREEND);
};

renderSiteComponents();
