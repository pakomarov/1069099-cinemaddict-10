import {createElement, RenderPosition, render} from '../utils';
import InfoSectionComponent from './info-section.js';
import RatingSectionComponent from './rating-section.js';
import CommentSectionComponent from './comment-section.js';

const SELECTOR_CONTAINER = `.film-details__inner`;

const createDetailsPopupTemplate = () => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`;
};

export default class DetailsPopup {
  constructor(film) {
    this._film = film;
    this._infoSectionComponent = new InfoSectionComponent(this._film);
    this._ratingSectionComponent = new RatingSectionComponent(this._film);
    this._commentSectionComponent = new CommentSectionComponent(this._film);
    this._element = null;
  }

  getTemplate() {
    return createDetailsPopupTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const containerElement = this._element.querySelector(SELECTOR_CONTAINER);
      render(containerElement, this._infoSectionComponent.getElement(), RenderPosition.BEFOREEND);
      if (this._film.userDetails.alreadyWatched) {
        render(containerElement, this._ratingSectionComponent.getElement(), RenderPosition.BEFOREEND);
      }
      render(containerElement, this._commentSectionComponent.getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
