import {RenderPosition, render} from './utils.js';
import {generateFilms} from './mocks/film.js';
import {getProfileRank} from './mocks/profile.js';
import Profile from './components/profile.js';
import {getFilters} from './mocks/filters.js';
import SiteMenu from './components/site-menu.js';
import Sort from './components/sort.js';
import Content from './components/content.js';
import Catalog from './components/catalog.js';
import FilmListContainer from './components/film-list-container.js';
import {ShowSettings} from './const.js';
import ShowMoreButton from './components/show-more-button';
import Film from './components/film.js';
import {getSelections} from './mocks/selections.js';
import Selection from './components/selection.js';
import {getCatalogSize} from './mocks/brief-stats.js';
import BriefStats from './components/brief-stats.js';
import DetailsPopup from './components/details-popup.js';
import DetailsForm from './components/details-form.js';
import InfoSection from './components/info-section.js';
import RatingSection from './components/rating-section.js';
import CommentSection from './components/comment-section.js';

const FILM_COUNT = 17;
const OPENED_FILM_INDEX = 0;

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const siteFooterElement = bodyElement.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);


const renderFilmDetails = (container, film, place) => {
  const detailsPopupComponent = new DetailsPopup();
  const detailsFormComponent = new DetailsForm();
  render(detailsPopupComponent.getElement(), detailsFormComponent.getElement(), RenderPosition.BEFOREEND);

  render(detailsFormComponent.getElement(), new InfoSection(film).getElement(), RenderPosition.BEFOREEND);
  if (film.userDetails.alreadyWatched) {
    render(detailsFormComponent.getElement(), new RatingSection(film).getElement(), RenderPosition.BEFOREEND);
  }
  render(detailsFormComponent.getElement(), new CommentSection(film).getElement(), RenderPosition.BEFOREEND);

  render(container, detailsPopupComponent.getElement(), place);
};

const renderSelection = (container, selection, place) => {
  const {title, films: selectedFilms} = selection;
  if (!selectedFilms) {
    return;
  }

  const selectionComponent = new Selection(title);
  render(container, selectionComponent.getElement(), place);
  const filmListContainer = new FilmListContainer();
  render(selectionComponent.getElement(), filmListContainer.getElement(), RenderPosition.BEFOREEND);
  selectedFilms.forEach((film) => {
    render(filmListContainer.getElement(), new Film(film).getElement(), RenderPosition.BEFOREEND);
  });
};

const renderSiteComponents = () => {
  const profileRank = getProfileRank(films);
  render(siteHeaderElement, new Profile(profileRank).getElement(), RenderPosition.BEFOREEND);

  const fragment = document.createDocumentFragment();

  const filters = getFilters(films);
  render(fragment, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);

  render(fragment, new Sort().getElement(), RenderPosition.BEFOREEND);

  const contentComponent = new Content();
  render(fragment, contentComponent.getElement(), RenderPosition.BEFOREEND);

  const catalogComponent = new Catalog();
  render(contentComponent.getElement(), catalogComponent.getElement(), RenderPosition.BEFOREEND);

  const catalogFilmListContainer = new FilmListContainer();
  render(catalogComponent.getElement(), catalogFilmListContainer.getElement(), RenderPosition.BEFOREEND);

  let showedFilmsCount = ShowSettings.FILM_COUNT_ON_START;

  films.slice(0, showedFilmsCount)
    .forEach((film) => {
      render(catalogFilmListContainer.getElement(), new Film(film).getElement(), RenderPosition.BEFOREEND);
    });

  const showMoreButtonComponent = new ShowMoreButton();
  render(catalogComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const renderMoreFilms = () => {
    const previouslyShowedFilmsCount = showedFilmsCount;
    showedFilmsCount = showedFilmsCount + ShowSettings.FILM_COUNT_BY_BUTTON;

    films.slice(previouslyShowedFilmsCount, showedFilmsCount)
      .forEach((film) => {
        render(catalogFilmListContainer.getElement(), new Film(film).getElement(), RenderPosition.BEFOREEND);
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

  const selections = getSelections(films);
  selections.forEach((selection) => {
    renderSelection(contentComponent.getElement(), selection, RenderPosition.BEFOREEND);
  });

  render(siteMainElement, fragment, RenderPosition.BEFOREEND);

  const catalogSize = getCatalogSize(films);
  render(siteFooterElement, new BriefStats(catalogSize).getElement(), RenderPosition.BEFOREEND);

  const openedFilm = films[OPENED_FILM_INDEX];
  renderFilmDetails(bodyElement, openedFilm, RenderPosition.BEFOREEND);
};

renderSiteComponents();
